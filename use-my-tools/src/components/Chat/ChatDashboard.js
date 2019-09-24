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
            currentConvo: {},
            convoSelected: false,
            newMessage: '',
			messages: [],
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
        const compoundUID = convo.compoundUID || ' ';
        const uid = this.state.uid;
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
                console.log(messages);
				// this.setState({
				// 	messages,
				// 	uid,
				// 	compoundUID,
				// 	recipientUID,
				// 	recipientName
				// }, () => this.scrollDownMessages());
            });
            
        this.setState({
            convoSelected: true,
            currentConvo: convo,
        }, () => {
            console.log("\nConvo Selected. ChatDashboard state: ", this.state);
        });
    }

    closeCurrentConvo = () => {
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
                                        uid={this.state.uid}
                                        currentConvo={this.state.currentConvo}
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
