import React from "react";
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";

import Convos from './Convos';


function TabContainer(props) {
    return (
      <Typography component="div" style={{ margin: 'none' }}>
        {props.children}
      </Typography>
    );
}

function StyledTab(props) {
  return (
    <Typography component="h1" style={{ margin: 'none' }}>
      {props.children}
    </Typography>
  );
}

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
    width: '30%',
    minWidth: 50,
    maxWidth: 200
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

class ConvoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 0,  // value corresponding to Open tab to display the Open convo list on mount
          newConvosCount: 0
        };
        // this.intervalID = 0;
    }

    

    componentDidMount() {
      // this.intervalID = setInterval(this.getNewConvos, 5000);
    }

    componentWillUnmount() {
      // clearInterval(this.intervalID);
    }

    // getNewConvos is used by Convolist to check how many New Convos are in the database
    // in order to update the number icon on the New tab showing how many are in that list
    // even when another tab/list is selected:

    // getNewConvos= () => {
    //   axios.get(`/api/chat/queue`)
    //   .then(response => {
    //     // if (response.data.length > this.state.newConvos.length) {
    //       this.setState({
    //         newConvosCount: response.data.length
    //       }, () => console.log('newConvosLength: ', this.state.newConvosLength));
    //     // }
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   })
    // }

    handleTabSelect= (event, value) => {
      this.setState({ value });
    };

    // handleQueueConvoSelect = (convo_id, customer_uid, customer_name, summary) => {
    //   // Remove convo from the Queue by updating in_q to false in the convo's db entry
    //   const data = { id: convo_id };
    //   const deQueueRequest = axios.put('/api/chat/dequeue', data);
    //   deQueueRequest
    //       .then(response => {
    //           console.log("Conversation removed from Queue.");
    //           this.props.handleQueueConvoSelect(convo_id, customer_uid, customer_name, summary);  // call hander at ChatDashboard to pass current convo info to ChatView
    //           this.setState({ value: 1 });                                                        // switch selected tab to Open tab
    //       })
    //       .catch(error => {
    //           console.log(error.message);
    //       })
    // }

    render() {
      const { classes } = this.props;
      const { value } = this.state;
      const newConvosCount = this.state.newConvosCount;
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
                  {/* <Tab
                    className={classes.tabElement}
                    label={
                      <div className={classes.tab}>
                        <h1 className={classes.tabLabel}>NEW</h1>
                        
                          {newConvosCount > 0 ? ( <span className={classes.convoCount}>{newConvosCount}</span>
                            ) : ('')
                          }
                        
                      </div>
                    }
                  /> */}
                  <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Open</h1>} />
                  <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Closed</h1>} />
              </Tabs>
            </Paper>
          </div>

          <div className={classes.queueList}>
                {this.state.value === 0 && <Convos  convoStatus={'open'} currentConvoId={this.props.currentConvoId} handleConvoSelect={this.handleQueueConvoSelect} />}
                {this.state.value === 1 && <Convos  convoStatus={'closed'} currentConvoId={this.props.currentConvoId} currentConvoClosed={this.props.currentConvoClosed} handleConvoSelect={this.props.handleActiveConvoSelect}/>}
          </div>

        </div>
      );
    }
}

ConvoList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConvoList);
