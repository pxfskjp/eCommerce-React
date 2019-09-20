import React from "react";
// import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import axios from 'axios';

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";

import { withFirebase } from "../../Firebase";

import Convos from './Convos';


const styles = {
    root: {
      flexGrow: 1,
      // border: '1px solid blue',
      // Changes from David
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    queueMenu: {
      // height: '100%',
      // border: '1px solid red',
      borderRadius: '0px',
      width: '100%',
      borderBottom: '1px gray solid',
    },
    queueList: {
      overflow: 'hidden',
      // height: '100% ',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
  },
  paper: {
    // height: '100%'
    borderRadius: '0px'
  },
  paper2: {
    // height: '100%',
    borderRadius: '0px'
  },
  tabs1: {
    height: '100%'
  },
  tabElement: {
    width: '100%',
    minWidth: 50,
    // maxWidth: 200
  },
  tab: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  tabLabel: {
    fontSize: 16,
    padding: 0
  },
  convoCount: {
    padding: 0,
    color: '#69DB30',
    'font-weight': 'bold'
  }
};

class ConvoListBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 0,  // value corresponding to Open tab to display the Open convo list on mount
          newConvosCount: 0,
          convos: [],
          openConvos: [],
          closedConvos: []
        };
        // this.intervalID = 0;
    }

    componentDidMount() {
      const uid = this.props.uid;
      console.log(uid);
      let openConvos = [];
      let closedConvos = [];
      let convos = [];

      // initialize listener to Firestore db and get existing messages
      // listen with onSnapshot()
      // The first query snapshot contains 'added' events 
      // for all existing documents that match the query  
      this.props.firebase.db
        .collection('conversations')
        .where('UIDs', 'array-contains', `${uid}`)
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              if (change.doc.data().isOpen === false) {
                closedConvos.push(change.doc.data());
              } else {
                openConvos.push(change.doc.data());
              }
            }
              
            if (change.type === 'modified') {
              if (change.doc.data().isOpen === false) {
                console.log('convo changed to closed: ', change.doc.data());
                // closedConvos.push(change.doc.data());

                openConvos = openConvos.filter(function(convo) {
                  return convo.compoundUID !== change.doc.data().compoundUID;
                })
                console.log(openConvos);
              } else {
                console.log('convo changed to open: ', change.doc.data());
                openConvos.push(change.doc.data());
              }
            }
          })
          this.setState({ openConvos, closedConvos });
        });
    }

    handleTabSelect= (event, value) => {
      this.setState({ value });
    };

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <div className={classes.queueMenu}>
            <Paper className={classes.paper}>
              <Tabs
                className={classes.paper2}
                value={this.state.value}
                onChange={this.handleTabSelect}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                  <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Conversations</h1>} />
              </Tabs>
            </Paper>
          </div>

          <div className={classes.queueList}>
                {this.state.value === 0 && 
                  <Convos  
                    convos={this.state.openConvos}
                    uid={this.props.uid}
                    currentConvoId={this.props.currentConvoId} 
                    handleConvoSelect={this.props.handleOpenConvoSelect} 
                  />
                }
          </div>

        </div>
      );
    }
}

ConvoListBase.propTypes = {
    classes: PropTypes.object.isRequired
};

const ConvoList = withStyles(styles)(withFirebase(ConvoListBase));

export default ConvoList;
