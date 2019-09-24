import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from '../Firebase';
import axios from 'axios';
import ConvoList from './ConvoList/ConvoList';
import ChatView from './ChatView';
import './ChatDashboard.css';
import './ConvoList/ConvoList.css';

class ChatDashboardBase extends React.Component {
    constructor() {
        super();
        this.state = {
            uid: null,
            firstName: '',
            lastName: '',
            imageURL: '',
            convoSelected: false,
            currentConvo: {},
            compoundUID: null,
            recipientUID: null,
            recipientName: null,
            messages: [],
            newMessage: '',  
        } 
    }

    componentDidMount() {
        axios.get("/api/users/userinfo")
            .then(user => {
                this.setState({
                    uid: user.data.uid,
                    imageUrl: user.data.image_url,
                    firstName: user.data.first_name,
                    lastName: user.data.last_name,
                }, () => console.log('ChatDash state after CDM get user info: ', this.state));
            })
            .catch(error => {
                console.log(error.message);
                //this.setState({error:error});
            });
    }

    handleOpenConvoSelect = (convo) => {
        console.log('handleOpenConvoSelect convo: ', convo);
        const compoundUID = convo.compoundUID || ' ';
        const uid = this.state.uid;
        console.log('handleOpenConvoSelect uid: ', uid);
		let recipientUID = null;
		if (convo.UIDs[0] === uid) {
			recipientUID = convo.UIDs[1];
		} else {
			recipientUID = convo.UIDs[0];
		}
		const recipientName = convo[recipientUID];

		// initialize onSnapshot()listener to Firestore db and get existing messages
		// The first query snapshot returned contains 'added' events
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
                console.log('messages: ', messages);
				this.setState({
                    convoSelected: true,
                    currentConvo: convo,
					messages,
					uid,
					compoundUID,
					recipientUID,
					recipientName
                }, () => console.log("\nConvo Selected. ChatDashboard state: ", this.state));
            });
    }

    sendMessage = (messageContent) => {
        // console.log('sendMessage messageContent:', messageContent);
        const { compoundUID } = this.state;
        const timeStamp = Date.now();
        const messageData = {
            content: messageContent,
            authorUID: this.state.uid,
			recipientUID: this.state.recipientUID,
			timeSent: timeStamp
        };
        // console.log('sendMessage messageData:', messageData);
        this.props.firebase.db
			.collection('conversations')
			.doc(compoundUID)
			.collection('messages')
			.doc(`${timeStamp}`)
			.set(messageData);
		this.setState({ message: '' });
    }

    closeCurrentConvo = () => {
        const { compoundUID } = this.state;
		this.props.firebase.db.collection('conversations').doc(compoundUID).update({ isOpen: false });
        this.setState({ convoSelected: false });
    }

    render() {
        const convoSelected = this.state.convoSelected;
        return (
            <div>
                {this.state.uid ? (
                    <div className="chat-dashboard-container">
                        <div className="chat-dash-left-container">
                            <ConvoList
                                uid={this.state.uid}
                                currentConvoId={this.state.currentConvoId}
                                currentConvoClosed={this.state.currentConvoClosed}
                                handleOpenConvoSelect={this.handleOpenConvoSelect}
                                handleClosedConvoSelect={this.handleClosedConvoSelect}
                            />
                        </div>

                        <div className="chat-dash-right-container">
                            {!convoSelected ? (
                                <p>No conversation selected.</p>
                                ) : (
                                    <ChatView
                                        currentConvo={this.state.currentConvo}
                                        uid={this.state.uid}
                                        recipientUID={this.state.recipientUID}
                                        messages={this.state.messages}
                                        sendMessage={this.sendMessage}
                                        closeCurrentConvo={this.closeCurrentConvo}
                                    />
                                )
                            }
                        </div>  
                    </div>
                ) : ( 
                    ''
                )}
                
            </div>
        );
    }

}

const ChatDashboard = withRouter(withFirebase(ChatDashboardBase));
export default ChatDashboard;
