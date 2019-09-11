import React, { Component } from 'react';
// import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
// import Paper from '@material-ui/core/Paper';
// import Avatar from '@material-ui/core/Avatar';
// import ButtonBase from '@material-ui/core/ButtonBase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './ChatView.css';
// import { ThemeProvider, MessageList, MessageGroup, MessageText, MessageTitle, Message, AgentBar, Row, IconButton, SendIcon, CloseIcon, TextComposer, AddIcon, TextInput, SendButton, EmojiIcon } from '@livechat/ui-kit';
// import { Grid } from '@material-ui/core';

import { withFirebase } from '../Firebase';

import axios from 'axios';

const styles = (theme) => ({
	root: {
		// overflowY: 'scroll',
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	chatViewHeadName: {
		fontSize: '24px',
		fontWeight: '300',
		padding: '0',
	},
	messageBody: {
		// marginTop: 20,
		paddingLeft: 20,
		paddingRight: 25,
		paddingBottom: 0,
		textAlign: 'justify'
	},
});

class ChatViewBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: null,
			ricipientUID: null,
			recipientName: '',
			compoundUID: null,
			message: '',
			messages: [],
			isOpen: true
    };
    
    this.messagesRef = React.createRef();
	}

	componentWillReceiveProps(newProps) {
		console.log('ChatView new props: ', newProps);

		const compoundUID = newProps.currentConvo.compoundUID || ' ';
		const uid = newProps.uid;

		let recipientUID = null;
		// let recipientName = null;
		if (newProps.currentConvo.UIDs[0] === uid) {
			recipientUID = newProps.currentConvo.UIDs[1];
		} else {
			recipientUID = newProps.currentConvo.UIDs[0];
		}
		const recipientName = newProps.currentConvo[recipientUID];
		console.log('recipientName: ', recipientName);

		// initialize listener to Firestore db and get existing messages
		// listen with onSnapshot()
		// The first query snapshot contains 'added' events
		// for all existing documents that match the query
		let messages = [];
		this.props.firebase.db
			.collection('conversations')
			.doc(compoundUID)
			.collection('messages')
			.onSnapshot((querySnapshot) => {
				querySnapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						messages.push(change.doc.data());
					}
				});
				this.setState({
					messages,
					uid,
					compoundUID,
					recipientUID,
					recipientName
				}, () => this.scrollDownMessages());
			});
  }
  
  scrollDownMessages = () => {
    this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
    // element.scrollTop = element.scrollHeight;
  }

	onSubmit = (event) => {
		// To Do:
		// configure relevant message data and send to Firestore
		const timeStamp = Date.now();
		const { compoundUID } = this.state;
		const data = {
			content: this.state.message,
			authorUID: this.state.uid,
			recipientUID: this.state.recipientUID,
			timeSent: timeStamp
		};
		console.log('message data:', data);

		this.props.firebase.db
			.collection('conversations')
			.doc(compoundUID)
			.collection('messages')
			.doc(`${timeStamp}`)
			.set(data);
		this.setState({ message: '' });
		event.preventDefault();
	};

	// method to update state.messages with new message from Firestore
	// addNewMessage = (newMessage) => {
	//     console.log("newMessage in ChatView addNewMessage: ", newMessage);
	//     const newMessages = [];
	//     this.state.messages.forEach(message => {
	//         newMessages.push({...message});
	//     });
	//     newMessages.push(newMessage);
	//     this.setState({ messages: newMessages });
	// }

	// method to update state based on user input
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// method to mark the convo as closed
	handleCloseConvo = (event) => {
		// this.props.closeConvo();
		const { compoundUID } = this.state;
		this.props.firebase.db.collection('conversations').doc(compoundUID).update({ isOpen: false });

		this.setState({ isClosed: true });
		event.preventDefault();
  };

	// scrollToBottom = () => {
	//     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	// }

	render() {
		const isClosed = this.state.isClosed;
		// const compoundUID = this.props.currentCompoundUID;
		const { classes } = this.props;

		return (
			// <div className={classes.root}>
			<div className="chatview-container">

				<div className="convo-header">
					<p className={classes.chatViewHeadName}>Chat with {this.state.recipientName}</p>
				</div>

				<div className="messages-container" ref={this.messagesRef}>
					{this.state.messages.map((message, index) => {
						let alignClass = null;
						if (message.authorUID === this.state.uid) {
							alignClass = 'message-container align-right';
						} else {
							alignClass = 'message-container align-left';
						}
						return (
							// <MuiThemeProvider>
							<div className={alignClass} key={index}>
								<div className="message-body">
									<Typography variant="h6" className={classes.messageBody}>
										{message.content}
									</Typography>
								</div>
							</div>
							// </MuiThemeProvider>
						);
					})}
				</div>
				{/* end messagelist */}

				{isClosed ? (
					<h1>This conversation is closed.</h1>
				) : (
					<div className="input-area">
						{/* Scroll div */}
						{/* <div
                    style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }
                  }>
                  </div>       */}
						<form onSubmit={this.onSubmit}>
							<input
                // hintText="message"
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
					// end input area
				)}
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
