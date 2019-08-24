import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


class ConfirmRentalDialog extends React.Component {
  state = {
    open: false,
    error: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

//   handleConfirm = () => {
//     const id = this.props.toolId;
//     axios.delete(`/api/tools/tool/delete/${id}`)
//     .then(response => {
//         this.handleClose();
//         this.props.handleToolDelete();
//     })
//     .catch(error => {
//         this.setState({ error: error.message });
//     })
//   };

  render() {
    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Confirm
          </Button>
          
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
              <div>
                <DialogTitle id="form-dialog-title">Confirm Rental</DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    Enter your payment details to confirm this rental
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleConfirm} color="primary">
                    Confirm
                  </Button>
                </DialogActions>
              </div>
            
          </Dialog>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
    );
  }
}

export default ConfirmRentalDialog;