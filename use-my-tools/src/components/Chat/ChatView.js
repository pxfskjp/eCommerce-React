import React, {Component} from 'react';
// import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter} from "react-router-dom"
import Typography from '@material-ui/core/Typography';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './ChatView.css';
// import { ThemeProvider, MessageList, MessageGroup, MessageText, MessageTitle, Message, AgentBar, Row, IconButton, SendIcon, CloseIcon, TextComposer, AddIcon, TextInput, SendButton, EmojiIcon } from '@livechat/ui-kit';
import { Grid } from '@material-ui/core';

import { withFirebase } from "../Firebase";


const styles = theme => ({
  root: {
    // overflowY: 'scroll',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 650,
    height: 130
  },
  chatViewHead: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'spaceEvenly',
    padding: '0',
    paddingLeft: '5%',
    height: '100px',
    borderBottom: '.5px lightgray solid',
  },
  chatViewHeadName: {
    fontSize: '24px',
    fontWeight: '300',
    padding: '0',
    marginBottom: '-2%',
  },
  chatViewHeadSummary: {
    fontSize: '18px',
    fontWeight: '200',
    padding: '0',
  },
  messageList: {
    marginBottom: 10,
    marginTop: 20,
    overflowY: 'scroll',
    overflowX: 'hidden',
    // maxHeight: '700px',
    flexGrow: 1,
    padding: 12,
    width: '100%',
    backgroundColor: 'white',

  },
  message: {
    marginBottom: 30
  },
  avatar: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 15,
    width: 55,
    height: 55,
  },
  messageAuthor: {
    textAlign: 'justify',
    padding: 10,
    paddingLeft: 20,
    // fontWeight: 'bold'
  },
  messageBody: {
    // marginTop: 20,
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 30,
    textAlign: 'justify'
  },
  inputArea: {
    height: '40px',
    marginBottom: '2%'
  },
  inputForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 40
  },

});


class ChatViewBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      isOpen: true,
    };
  }


  componentWillReceiveProps(newProps) {
    // console.log('ChatView CDM state: ', this.state);
    console.log('ChatView CDM new props: ', newProps);
    let compoundUID = newProps.currentCompoundUID || ' ';
    console.log('ChatView new props.compoundUID: ', compoundUID);
    // one-time get of messages from specific convo:
    let messages = [];
    this.props.firebase.db
      .collection('conversations')
      .doc(compoundUID)
      .collection('messages')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
    
        snapshot.forEach(doc => {
          messages.unshift(doc.data());
          // console.log(doc.id, '=>', doc.data());
        });
        console.log(messages);
        this.setState({ messages });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });



    // To Do:
    // initialize listener to Firestore db and get existing messages
    // listen with onSnapshot()


    // Scroll to latest message whenever component mounts
    // this.scrollToBottom();
  }

  onSubmit = event =>{
    // To Do:
    // configure relevant message data and send to Firestore
    
    // const data = {
    //   content: this.state.message,
    //   authorUID: 
    // }

    event.preventDefault();
  }

  // method to update state.messages with new message from Firestore
  addNewMessage = (newMessage) => {
      console.log("newMessage in ChatView addNewMessage: ", newMessage);
      const newMessages = [];
      this.state.messages.forEach(message => {
          newMessages.push({...message});
      });
      newMessages.push(newMessage);
      this.setState({ messages: newMessages });
  }

  // method to update state.message based on user input
  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  // method to mark the convo as closed
  handleCloseConvo = event => {
      this.props.closeConvo();
      this.setState({ is_closed: true });
      event.preventDefault();
  }

    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // }


    render() {
        const currentConvoClosed = this.props.currentConvoClosed;
        const compoundUID = this.props.currentCompoundUID;
        const { classes } = this.props;
        return (

          <div className={classes.root}>
              <div className={classes.chatViewHead}>
                <p className={classes.chatViewHeadName}>Recipient User Name</p>
              </div>

               <div className={classes.messageList}>
                    {this.state.messages.map((message, index) => {
                        // console.log(this.state)
                        console.log(message)
                        return (
                          <div className={classes.message} key={index}>
                            <MuiThemeProvider>
                              <Paper className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={16}>
                                  <Grid item>
                                    {/* <Avatar alt="Avatar" className={classes.avatar}>
                                      {message.author_name[0]}
                                    </Avatar> */}
                                  </Grid>
                                  <Grid>
                                    <Grid
                                      item
                                      xs
                                    >
                                      <Typography
                                        variant="h6"
                                        className={classes.messageAuthor}
                                      >
                                        {message.authorUID}
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs
                                    >
                                      <Typography
                                        variant="componenth6"
                                        className={classes.messageBody}
                                      >
                                      {message.content}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                </Grid>
                              </Paper>
                            </MuiThemeProvider>
                          </div>
                        );
                    })}
              </div>
              {currentConvoClosed ? (
                <h1>This conversation is closed.</h1>
              ) : (
                <div className={classes.inputArea}>
                  {/* Scroll div */}
                  {/* <div
                    style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }
                  }>
                  </div>       */}
                  <form className={classes.inputForm} onSubmit={this.onSubmit}>
                    <input
                      hintText="message"
                      name="message"
                      type="text"
                      value={this.state.message}
                      onChange={this.onChange}
                      style ={{
                        border: '1.5px solid lightgrey',
                        borderRadius: '3px',
                        height: '35px',
                        padding: '0',
                        width: '90vw',
                        maxWidth: '490px',
                      }}
                      className="messageInput"
                    />
                    <div style={{
                      marginLeft: '3px',
                    }}>
                      <MuiThemeProvider>
                        <RaisedButton
                          label="Send"
                          primary={true}
                          type="submit"
                        />
                        <RaisedButton
                          label="End Convo"
                          onClick={this.handleCloseConvo}
                        />
                      </MuiThemeProvider>
                    </div>
                  </form>
                </div>
              )}
              
          </div>
    );
  }
}

// ChatView.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ChatView);
const ChatView = withStyles(styles)(withRouter(withFirebase(ChatViewBase)));

export default ChatView;
