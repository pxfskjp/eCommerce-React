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

  handleConfirm = () => {
    const id = this.props.toolId;
    axios.delete(`/api/tools/tool/delete/${id}`)
    .then(response => {
        this.handleClose();
        this.props.handleToolDelete();
    })
    .catch(error => {
        this.setState({ error: error.message });
    })
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
                <DialogTitle id="form-dialog-title">Delete Tool</DialogTitle>

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