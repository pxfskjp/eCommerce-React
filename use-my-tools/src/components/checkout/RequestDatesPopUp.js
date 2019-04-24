import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DateRangePicker from '../ReactDates/DateRangePicker';
import moment from "moment";


import axios from 'axios';
import { get } from 'https';

const styles = {
  dialogPaper: {
      minHeight: '50vh',
      maxHeight: '100vh',
  },
  dialogContent: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'space-around'
    
  }
};


class RequestDatesPopUp extends React.Component {
  state = {
    open: false,
    startDate: null,
    endDate: null,
    blockedDateRanges: [],
    blockedDays: [],
    error: null
  };

  getDatesInRange = ({ startDate, endDate }) => {
    let datesArray = [];
    // const startDate = startDate;
    // const endDate = endDate;
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      datesArray.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    console.log('datesArray: ', datesArray);
    return datesArray;
  }

  handleClickOpen = () => {
    // this.setState({ open: true });

    // *** TO DO: get reserved dates for tool and pass to DRP as props to block dates

    const toolId = this.props.toolId;
    axios.get(`/api/tools/tool/reserveddates/${toolId}`)
      .then(dates => {
        const dateRanges = dates.data;
        let blockedDays = [];
        for (let i = 0; i < dateRanges.length; i++) {
          // console.log(dateRanges[i]);
          // blockedDays.push(this.getDatesInRange(dateRanges[i]));
          this.getDatesInRange(dateRanges[i]);
        }
        console.log('blockedDays:', blockedDays);
        this.setState({ open: true });
        // this.setState({ blockedDateRanges: dates.data }, () => console.log('PopUp state.blockedDates:', this.state.blockedDateRanges));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
  };

  handleClose = () => {
    this.setState({ 
      startDate: null,
      endDate: null, 
      open: false 
    });
  };

  onDatesChange = ({ startDate, endDate }) => {

    this.setState({ startDate, endDate }, () => console.log('PopUp state: ', this.state));
    
  };

//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

  onSubmit = () => {

    let reservationData = { 
      toolId: this.props.toolId,
      res_type: "rental",
      startDate: this.state.startDate, 
      endDate: this.state.endDate 
    };
    
    axios.post('/api/tools/reserveDates', reservationData)
        .then(response => {
            console.log('Dates reservation created with response: ', response);
            this.handleClose();
        })
        .catch(error => {
            console.log(error.message);
            this.setState({ error: error.message });
        })
  };

  render() {
    const { classes } = this.props;

    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Rent this tool
          </Button>
          
          <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            
              
                <DialogTitle id="form-dialog-title">Request Dates</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                  <DialogContentText>
                    Select the dates to rent this tool:
                  </DialogContentText>
                  <DateRangePicker onDatesChange={this.onDatesChange} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.onSubmit} color="primary">
                    Submit
                  </Button>
                </DialogActions>
             
            
          </Dialog>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
    );
  }
}

export default withStyles(styles)(RequestDatesPopUp);