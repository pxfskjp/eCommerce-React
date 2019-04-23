import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { get } from 'https';

class AddRepForm extends React.Component {
  state = {
    open: false,
    error: null
  };

  handleClickOpen = () => {
    const tool_id = this.props.tool_id;
    axios.post('/api/tools/reservedates', reservationData)
      .then(response => {
        
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
  };

//   handleClose = () => {
//     this.setState({ email: '', open: false });
//   };

//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   onSubmit = () => {
//       const email = this.state.email;
//       const company_id = this.props.company_id;
//       const rep = { email, company_id };
//       axios.post('/api/approvedemails', rep)
//         .then(id => {
//             this.handleClose();
//         })
//         .catch(error => {
//             this.setState({ error: error.message });
//         })
//   };

  render() {

    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Rent this tool
          </Button>
          
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            
              <div>
                <DialogTitle id="form-dialog-title">Add a Team Member</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the email address of a team member below to invite them to join. They will be sent an email with a link to sign up.
                  </DialogContentText>
                  
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.onSubmit} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </div>
            
          </Dialog>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
    );
  }
}

export default AddRepForm;