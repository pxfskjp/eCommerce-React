import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

import ConvoList from './ConvoList/ConvoList';
import ChatView from './ChatView';
import './ChatDashboard.css';
import './ConvoList/ConvoList.css';

class ChatDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            uid: null,
            firstName: '',
            lastName: '',
            imageURL: '',
            currentConvo: {},
            convoSelected: true,
            currentConvoClosed: false
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
            }, () => {
                console.log('ChatDash state after CDM get user info: ', this.state);
            });
            })
            .catch(error => {
            console.log(error.message);
            //this.setState({error:error});
            });
    }

    handleOpenConvoSelect = (convo) => {
        // const uid = this.state.uid;
        // let recipientUID = null;
        // if (convo.UIDOne !== uid) {
        //     recipientUID =  convo.UIDOne;
        // } else {
        //     recipientUID =  convo.UIDTwo;
        // }
        this.setState({
            convoSelected: true,
            currentConvo: convo,
        }, () => {
            console.log("\nConvo Selected. ChatDashboard state: ", this.state);
        });
    }

    handleClosedConvoSelect(compoundUID) {
        
        this.setState({
            convoSelected: true,
            currentConvoClosed: true,
            currentCompoundUID: compoundUID,
        }, () => {
            console.log("\nConvo Selected. ChatDashboard state: ", this.state);
        });
    }

    // closeConvo() {
    //     const data = { id: this.state.currentConvoId };
    //     console.log("close convo data: ", data);
    //     axios.put('/api/chat/close', data)
    //     .then(response => {
    //         console.log("Conversation closed.")
    //         this.setState({ 
    //             currentConvoClosed: true 
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //     })
    // }

    render() {
        const convoSelected = this.state.convoSelected;
        return (
            <div>
            
            <div className="chat-dashboard-container">
                <div className="chat-dash-left-container">
                    
                    <ConvoList
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
                                closeConvo={this.closeConvo}
                                currentConvoClosed={this.state.currentConvoClosed}
                            />
                        )
                    }
                </div>
            </div>
            </div>
        );
    }

}

export default withRouter(ChatDashboard);
