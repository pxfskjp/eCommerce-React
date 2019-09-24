import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase';
import './ChatView.css';

const styles = (theme) => ({
	chatViewHeadName: {
		fontSize: '24px',
		fontWeight: '300',
		padding: '0',
	},
	messageBody: {
		paddingLeft: 20,
		paddingRight: 25,
		paddingBottom: 0,
		textAlign: 'left'
	},
});

class ChatViewBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: null,
			recipientUID: null,
			recipientName: '',
			compoundUID: null,
			message: '',
			messages: [],
    	};
    	this.messagesRef = React.createRef();
	};

	// componentWillReceiveProps(newProps) {
	// 	// console.log('ChatView new props: ', newProps);
	// 	const compoundUID = newProps.currentConvo.compoundUID || ' ';
	// 	const uid = newProps.uid;
	// 	let recipientUID = null;
	// 	if (newProps.currentConvo.UIDs[0] === uid) {
	// 		recipientUID = newProps.currentConvo.UIDs[1];
	// 	} else {
	// 		recipientUID = newProps.currentConvo.UIDs[0];
	// 	}
	// 	const recipientName = newProps.currentConvo[recipientUID];

	// 	// initialize listener to Firestore db and get existing messages
	// 	// listen with onSnapshot()
	// 	// The first query snapshot contains 'added' events
	// 	// for all existing documents that match the query
	// 	let messages = [];
	// 	this.props.firebase.db
	// 		.collection('conversations')
	// 		.doc(compoundUID)
	// 		.collection('messages')
	// 		.onSnapshot((querySnapshot) => {
	// 			querySnapshot.docChanges().forEach((change) => {
	// 				if (change.type === 'added') {
	// 					messages.push(change.doc.data());
	// 				}
	// 			});
	// 			this.setState({
	// 				messages,
	// 				uid,
	// 				compoundUID,
	// 				recipientUID,
	// 				recipientName
	// 			}, () => this.scrollDownMessages());
	// 		});
  	// };
  
	scrollDownMessages = () => {
		this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
	}

	onSubmit = (event) => {
		// configure message data and send to Firestore
		const timeStamp = Date.now();
		const { compoundUID } = this.state;
		const data = {
			content: this.state.message,
			authorUID: this.state.uid,
			recipientUID: this.state.recipientUID,
			timeSent: timeStamp
		};
		this.props.firebase.db
			.collection('conversations')
			.doc(compoundUID)
			.collection('messages')
			.doc(`${timeStamp}`)
			.set(data);
		this.setState({ message: '' });
		event.preventDefault();
	};

	// method to update state based on user input
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// method to mark the convo as closed
	handleCloseConvo = (event) => {
		const { compoundUID } = this.state;
		this.props.firebase.db.collection('conversations').doc(compoundUID).update({ isOpen: false });
		this.props.closeCurrentConvo();
		event.preventDefault();
  	};

	render() {
		const { classes } = this.props;
		return (
			<div className="chatview-container">
				<div className="convo-header">
					<p className={classes.chatViewHeadName}>Chat with {this.state.recipientName}</p>
				</div>
				<div className="messages-container" ref={this.messagesRef}>
					{this.props.messages.map((message, index) => {
						let alignClass = null;
						if (message.authorUID === this.state.uid) {
							alignClass = 'message-container align-right';
						} else {
							alignClass = 'message-container align-left';
						}
						return (
							<div className={alignClass} key={index}>
								<div className="message-body">
									<Typography variant="h6" className={classes.messageBody}>
										{message.content}
									</Typography>
								</div>
							</div>
						);
					})}
				</div>
				{/* end messagelist */}
				
				<div className="input-area">
					<form onSubmit={this.onSubmit}>
						<input
							className="message-input"
							name="message"
							type="text"
							value={this.state.message}
							onChange={this.onChange}
						/>
						<div className="buttons-container">
							<button className="send-btn" type="submit">Send</button>
							<button className="end-btn"onClick={this.handleCloseConvo}>End Convo</button>
						</div>
					</form>
				</div>
				{/* end input area */}
			</div>
		);
	}
}

ChatViewBase.propTypes = {
	classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(ChatView);
const ChatView = withStyles(styles)(withRouter(withFirebase(ChatViewBase)));

export default ChatView;

// static getDerivedStateFromProps(nextProps, prevState) {
// 	console.log('ChatView getDerivedState nextProps: ', nextProps);
// 	const compoundUID = nextProps.currentConvo.compoundUID || ' ';
// 	const uid = nextProps.uid;
// 	let recipientUID;

// 	if (nextProps.currentConvo.UIDs[0] === uid) {
// 		recipientUID = nextProps.currentConvo.UIDs[1];
// 		return {
// 			uid: uid,
// 			recipientUID: recipientUID,
// 			recipientName: nextProps.currentConvo[recipientUID],
// 			compoundUID: compoundUID
// 		};
// 	} else {
// 		recipientUID = nextProps.currentConvo.UIDs[0];
// 		return {
// 			recipientUID: recipientUID
// 		};
// 	}
// }

// componentDidMount() {
// 	console.log('ChatView CDU called');
// 	// if compoundUID prop has changed,
// 	// initialize listener to Firestore, which also gets existing messages
// 	// The first query snapshot labels all existing documents 
// 	// that match the query as 'added' events
// 	const { uid, compoundUID } = this.props;
// 	console.log('CDU uid, compoundUID: ', uid, compoundUID)
// 	const {recipientUID, recipientName } = this.state;

// 	let messages = [];
// 	this.props.firebase.db
// 		.collection('conversations')
// 		.doc(this.props.currentConvo.compoundUID)
// 		.collection('messages')
// 		.onSnapshot((querySnapshot) => {
// 			querySnapshot.docChanges().forEach((change) => {
// 				if (change.type === 'added') {
// 					messages.push(change.doc.data());
// 				}
// 			});
// 			this.setState({
// 				messages,
// 				uid,
// 				compoundUID,
// 				recipientUID,
// 				recipientName
// 			}, () => this.scrollDownMessages());
// 		});

// }
  
// componentDidUpdate(prevProps, prevState) {
// 	console.log('ChatView CDU called');
// 	// if compoundUID prop has changed,
// 	// initialize listener to Firestore, which also gets existing messages
// 	// The first query snapshot labels all existing documents 
// 	// that match the query as 'added' events
// 	const { uid, compoundUID } = this.props;
// 	console.log('CDU uid, compoundUID: ', uid, compoundUID)
// 	const {recipientUID, recipientName } = this.state;
// 	if (this.props.currentConvo.compoundUID !== prevProps.currentConvo.compoundUID) {
// 		let messages = [];
// 		this.props.firebase.db
// 			.collection('conversations')
// 			.doc(this.props.currentConvo.compoundUID)
// 			.collection('messages')
// 			.onSnapshot((querySnapshot) => {
// 				querySnapshot.docChanges().forEach((change) => {
// 					if (change.type === 'added') {
// 						messages.push(change.doc.data());
// 					}
// 				});
// 				this.setState({
// 					messages,
// 					uid,
// 					compoundUID,
// 					recipientUID,
// 					recipientName
// 				}, () => this.scrollDownMessages());
// 			});
// 	}
// }