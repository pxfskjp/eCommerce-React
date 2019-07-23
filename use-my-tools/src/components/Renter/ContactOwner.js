import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

import { withFirebase } from "../Firebase";


class ContactOwnerBase extends React.Component {
  state = {
    open: false,
    message: '',
    error: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleConfirm = event => {
    const renterUID = this.props.renterUID;
    const ownerUID = this.props.ownerUID;
    // create compoundUID from owner and renter uid
    let compoundUID = null;
    if (renterUID < ownerUID) {
        compoundUID = renterUID + ownerUID;
    } else {
        compoundUID = ownerUID + renterUID;
    }

    let convoData = {
        UIDOne: renterUID,
        UIDTwo: ownerUID,
        compoundUID,
        isOpen: true,
    }

    console.log(compoundUID);
    // add a document with id === compoundUID in the conversations collection in firestore
    this.props.firebase.db
        .collection('conversations')
        .doc(`${compoundUID}`)
        .set(convoData, { merge: true });

    
    this.setState({ message: '', open: false })
    // add a messages collection to the new conversation
    // add a document to the messages collection with id === timestamp and content === state.message


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