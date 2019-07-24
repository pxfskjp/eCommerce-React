import React, { Component } from 'react';
// import { withRouter} from "react-router-dom"
// import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
// import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { ThemeProvider, MessageList, MessageGroup, MessageText, MessageTitle, Message, AgentBar, Row } from '@livechat/ui-kit';

import { withFirebase } from "../../Firebase";


const styles = theme => ({
  root: {
    // border: '1px dotted black',
    // overflowY: 'scroll',
    // height: '100vh',
  },
  convoList: {
    overflowY: 'scroll',
    height: '92vh',
  },
  paper: {
    height: 100,
    textAlign: 'left',
    padding: theme.spacing.unit,
    paddingLeft: '5%',
    borderRadius: '0px',
    border: '0.2px solid grey',
    borderTop: 'none',
    // width: '85%',
    // marrgin: 10,
    // maxWidth: 400,
    // margin: `${theme.spacing.unit}px auto`,

  },
  queueItem: {
    // padding: theme.spacing.unit * 2,
    // height: 250,
    // width: '100%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  queueTitle: {
    fontSize: '24px',
    fontWeight: 300,
    marginTop: '5px',
  },
  queueSummary: {
    fontSize: '20px',
    fontWeight: 200,
    marginTop: '0',
  },
  listFooter: {
    height: '100px',
    marginTop: '75px',
    fontSize: '20px',
  }
});

const ConvosBase = props => {
    
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <Typography
        variant='h4'
      >
      </Typography>
      <div className={classes.convoList}>
          {props.convos.map((convo, index) => {
            let recipientUID = null;
            if (convo.UIDs[0] === props.uid) {
              recipientUID = convo.UIDs[1];
            } else {
              recipientUID = convo.UIDs[0];
            }
            return (
              <div className={classes.queueItem} key={index}>
                <MuiThemeProvider>
                  <Paper
                    className={classes.paper}
                    style={{ backgroundColor: props.currentConvoId === convo.convo_id ? '#E7E7E7' : 'white' }}
                    // onClick={() => this.props.handleConvoSelect(convo.compoundUID)}
                    onClick={() => props.handleConvoSelect(convo)}
                  >
                    <p>{convo[recipientUID]}</p>
                  </Paper>
                </MuiThemeProvider>
              </div>
            );
          })}
          <div className={classes.listFooter}>
            <p>End of list</p>
          </div>
      </div>
    </div>

  );
    
}

const Convos =  withStyles(styles)(withFirebase(ConvosBase));

export default Convos;


// constructor(props) {
  //   super(props);
  //   this.state = {
  //     conversations: []
  //   }
    
  // }

  // componentDidMount() {
  //   // this.getConvos();
  //   const uid = this.props.uid;
  //   // console.log('convos this.props: ', this.props);
  //   const isOpen = this.props.isOpen;
    
  //   let conversations = [];
  //   // one-time get of convos:
  //   // this.props.firebase.db
  //   //   .collection('conversations')
  //   //   .where('isOpen', '==', isOpen)  //isOpen can be true or false depending on prop
  //   //   .get()
  //   //   .then(snapshot => {
  //   //     if (snapshot.empty) {
  //   //       console.log('No matching documents.');
  //   //       return;
  //   //     }  
    
  //   //     snapshot.forEach(doc => {
  //   //       conversations.push(doc.data());
  //   //       // console.log(doc.id, '=>', doc.data());
  //   //     });
  //   //     console.log(conversations);
  //   //     this.setState({ conversations });
  //   //   })
  //   //   .catch(err => {
  //   //     console.log('Error getting documents', err);
  //   //   });


  //   // this.props.firebase.db
  //   //   .collection('conversations')
  //   //   .where('UIDs', 'array-contains', uid)
  //   //   .where('isOpen', '==', isOpen)  //  isOpen can be true or false depending on prop
  //   //   .get()
  //   //   .then(snapshot => {
  //   //     if (snapshot.empty) {
  //   //       console.log('No matching documents.');
  //   //       // return;
  //   //     }  
  //   //     snapshot.forEach(doc => {
  //   //       conversations.push(doc.data()); // push each doc from the conversations collection
  //   //       // console.log(doc.id, '=>', doc.data());
  //   //     });
  //   //     console.log('conversations: ', conversations);
  //   //     this.setState({ conversations });
  //   //   })
  //   //   .catch(err => {
  //   //     console.log('Error getting documents', err.message);
  //   //   });


  // }

  // getConvos = () => {
  //   console.log('getConvos called');
    
  // }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.currentConvoClosed !== this.props.currentConvoClosed) {
  //     console.log('Convos currentConvoClosed changed');
  //     const getClosed = axios.get(`/api/chat/${this.props.convoStatus}`);
  //     getClosed
  //       .then(response => {
  //         this.setState({
  //           conversations: response.data
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error.message);
  //       })
  //   }
  // }

  // render() {
    //     const { classes } = this.props;
        
//     return (
//       <div className={classes.root}>
//         <Typography
//           variant='h4'
//         >
//         </Typography>
//         <div className={classes.convoList}>
//             {this.state.conversations.map((convo, index) => {

//               return (
//                 <div className={classes.queueItem} key={index}>
//                   <MuiThemeProvider>
//                     <Paper
//                       className={classes.paper}
//                       style={{ backgroundColor: this.props.currentConvoId === convo.convo_id ? '#E7E7E7' : 'white' }}
//                       // onClick={() => this.props.handleConvoSelect(convo.compoundUID)}
//                       onClick={() => this.props.handleConvoSelect(convo)}
//                     >
//                       <p>{convo.compoundUID}</p>
//                     </Paper>
//                   </MuiThemeProvider>
//                 </div>
//               );
//             })}
//             <div className={classes.listFooter}>
//               <p>End of list</p>
//             </div>
//         </div>
//       </div>

//     );
// // }