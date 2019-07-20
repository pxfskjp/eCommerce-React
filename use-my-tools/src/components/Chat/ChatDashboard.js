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
            rep_uid: null,
            rep_name: null,
            url: null,
            currentConvoId: null,
            currentConvoSocket: null,
            currentConvoSummary: null,
            currentCustomerName: null,
            convoSelected: false,
            currentConvoClosed: false
        }
        // this.handleQueueConvoSelect = this.handleQueueConvoSelect.bind(this);
        // this.handleActiveConvoSelect = this.handleActiveConvoSelect.bind(this);
        // this.handleClosedConvoSelect = this.handleClosedConvoSelect.bind(this);
        // this.closeConvo = this.closeConvo.bind(this);
        // this.addMessage = this.addMessage.bind(this);
    }

    // componentDidMount() {
    //     const repRequest = axios.get("/api/reps/alldetails");
    //     repRequest.then(rep => {
    //         this.setState({
    //         rep_uid: rep.data.uid,
    //         url: rep.data.url,
    //         rep_name: rep.data.name,
    //       }, () => {
    //         console.log('ChatView state after getting messages in CDM: ', this.state);
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error.message);
    //       //this.setState({error:error});
    //     });
    // }

    handleOpenConvoSelect(convo_id, customer_uid, customer_name, summary) {

        this.setState({
            convoSelected: true,
            currentConvoId: convo_id,
            currentConvoSocket: customer_uid,
            currentConvoSummary: summary,
            currentCustomerName: customer_name,
        }, () => {
            console.log("\nQueue Convo Selected. ChatDashboard state: ", this.state);
        });
    }

    handleClosedConvoSelect(convo_id, customer_uid, customer_name, summary) {
        
        this.setState({
            convoSelected: true,
            currentConvoClosed: true,
            currentConvoId: convo_id,
            currentConvoSocket: customer_uid,
            currentConvoSummary: summary,
            currentCustomerName: customer_name,
        }, () => {
            console.log("\nClosed Convo Selected. ChatDashboard state: ", this.state);
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
                        handleOpenConvoSelect={this.handleQueueConvoSelect}
                        handleClosedConvoSelect={this.handleClosedConvoSelect}
                    />
                </div>

                <div className="chat-dash-right-container">
                    {!convoSelected ? (
                        <p>No conversation selected.</p>
                        ) : (
                            <ChatView
                                currentConvoId={this.state.currentConvoId}
                                currentConvoSocket={this.state.currentConvoSocket}
                                rep_uid={this.state.rep_uid}
                                rep_name={this.state.rep_name}
                                url={this.state.url}
                                summary={this.state.currentConvoSummary}
                                customerName={this.state.currentCustomerName}
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
