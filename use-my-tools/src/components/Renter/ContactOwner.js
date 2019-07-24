import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { withFirebase } from "../Firebase";
import axios from 'axios';

class ContactOwnerBase extends React.Component {
  state = {
    open: false,
    message: '',
    error: null
  };

  handleClickOpen = () => {
    const renterUID = this.props.renterUID;  // get uid of current user b/c request is going to firebase and not through built-in server auth
    const ownerUID = this.props.ownerUID;
    let renterName = null;
    let ownerName = null;
    axios.get(`/api/users/username/${renterUID}`)
      .then(renter => {
        renterName = renter.data.first_name + ' ' + renter.data.last_name;
        console.log('renter name: ', renterName);

        axios.get(`/api/users/username/${ownerUID}`)
          .then(owner => {
            ownerName = owner.data.first_name + ' ' + owner.data.last_name;
            console.log('owner name: ', ownerName);
          })
          .catch(error => {
            console.log(error.message);
          })
      })
      .catch(error => {
        console.log(error.message);
      })
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleConfirm = event => {
    const renterUID = this.props.renterUID;  // get uid of current user b/c request is going to firebase and not through built-in server auth
    const ownerUID = this.props.ownerUID;
    // create compoundUID from owner and renter uid
    let compoundUID = null;
    if (renterUID < ownerUID) {
        compoundUID = renterUID + ownerUID;
    } else {
        compoundUID = ownerUID + renterUID;
    }
    // console.log(compoundUID);

    // define convo data for conversations collection:
    let convoData = {
        // UIDOne: renterUID,
        // UIDTwo: ownerUID,
        UIDs: [renterUID, ownerUID],
        compoundUID,
        isOpen: true,
    }
    
    // add a document with id === compoundUID in the conversations collection in firestore:
    this.props.firebase.db
        .collection('conversations')
        .doc(`${compoundUID}`)
        .set(convoData, { merge: true });


    // define message data for firestore:
    let timeStamp = Date.now();
    let messageData = {
        authorUID: renterUID,
        recipientUID: ownerUID,
        content: this.state.message,
        timeSent: timeStamp
    }
    // add a messages collection to the new conversation and
    // add a document to the messages collection with id === timestamp and content === state.message
    this.props.firebase.db
        .collection('conversations')
        .doc(compoundUID)
        .collection('messages')
        .doc(`${timeStamp}`)
        .set(messageData);
    
    this.setState({ message: '', open: false })

    event.preventDefault();
  };

  render() {
    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Contact Owner
          </Button>
          
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            
              <div>
                <DialogTitle id="form-dialog-title">Contact Owner</DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    Write a message to the owner of this tool
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="message"
                    name="message"
                    label="Message"
                    type="text"
                    required={true}
                    value={this.state.message}
                    onChange={this.onChange}
                    fullWidth
                  />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleConfirm} color="primary">
                        Send
                    </Button>
                </DialogActions>
              </div>
            
          </Dialog>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
    );
  }
}

const ContactOwner = withFirebase(ContactOwnerBase);


export default ContactOwner;