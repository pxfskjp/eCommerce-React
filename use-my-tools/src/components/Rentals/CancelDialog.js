import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


class CancelDialog extends React.Component {
  state = {
    open: false,
    error: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    console.log(this.props);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirm = () => {
    const { rentalId, cancelStatus } = this.props;
    const updateData = { rentalId, status: cancelStatus };
    axios.put(`/api/rentals/updatestatus`, updateData)
    .then(response => {
        this.handleClose();
    })
    .catch(error => {
        this.setState({ error: error.message });
    })
  };

  render() {
    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Cancel Rental
          </Button>
          
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            
              <div>
                <DialogTitle id="form-dialog-title">Cancel Rental</DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to cancel this rental?
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    No, don't cancel
                  </Button>
                  <Button onClick={this.handleConfirm} color="primary">
                    Yes, cancel
                  </Button>
                </DialogActions>
              </div>
            
          </Dialog>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
    );
  }
}

export default CancelDialog;