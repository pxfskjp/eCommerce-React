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
			message: ''
    	};
    	this.messagesRef = React.createRef();
	};

	componentDidMount() {
		this.scrollDownMessages();
	};

	componentDidUpdate(prevProps, prevState) {
		this.scrollDownMessages();
	};
  
	scrollDownMessages = () => {
		this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
	};
	
	// method to send a message when user submits:
	onSubmit = (event) => {
		const messageContent = this.state.message;
		this.props.sendMessage(messageContent);
		this.setState({ message: '' });
		event.preventDefault();
	};

	// method to update state based on user input:
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// method to mark the convo as closed
	handleCloseConvo = (event) => {
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
						if (message.authorUID === this.props.uid) {
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