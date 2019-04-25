import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DateRangePickerWrapper from '../ReactDates/DateRangePicker';
import moment from "moment";
import isSameDay from 'react-dates/lib/utils/isSameDay';


import axios from 'axios';
import { get } from 'https';

const styles = {
  dialogPaper: {
      minHeight: '520px',
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
    blockedDaysUpdated: false,
    error: null
  };

  isDayBlocked = day => {
    // console.log('PopUp state.blockedDays on first isDayBlocked call', this.state.blockedDays);
    console.log('isDayBlocked moment(day):', moment(day).format('YYYY-MM-DD'));
    // console.log(this.state.blockedDays.includes(moment(day)));
    // return this.state.blockedDays.includes(moment(day));
    console.log('PopUp isDayBlocked called.');
    const blockedDays = this.state.blockedDays;
    const day1 = moment(day).format('YYYY-MM-DD');

   if (blockedDays.includes(day1)) {
     return true;
   }
   return false;
  }

  getDatesInRange = ({ startDate, endDate }) => {
    let datesArray = [];
    // const startDate = startDate;
    // const endDate = endDate;
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      datesArray.push(moment(currentDate).format('YYYY-MM-DD'));
      // datesArray.push(moment(currentDate));
      currentDate = moment(currentDate).add(1, 'days');
    }
    console.log('datesArray: ', datesArray);
    return datesArray;
  }

  handleClickOpen = () => {
    this.setState({ open: true });

    const toolId = this.props.toolId;
    axios.get(`/api/tools/tool/reserveddates/${toolId}`)
      .then(dates => {
        const dateRanges = dates.data;
        let blockedDays = [];

        for (let i = 0; i < dateRanges.length; i++) {
          // blockedDays.push(this.getDatesInRange(dateRanges[i]));
          let datesArray = this.getDatesInRange(dateRanges[i]);
          for (let d = 0; d < datesArray.length; d++) {
            blockedDays.push(datesArray[d]);
          }
        }

        console.log('blockedDays:', blockedDays);
        this.setState({ 
          open: true,
          blockedDays: blockedDays,
          blockedDaysUpdated: true 
        });
        // this.setState({ blockedDateRanges: dates.data }, () => console.log('PopUp state.blockedDateRanges:', this.state.blockedDateRanges));
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
    const blockedDaysUpdated = this.state.blockedDaysUpdated;
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
              
              {blockedDaysUpdated ? (
                <DateRangePickerWrapper isDayBlocked={this.isDayBlocked} onDatesChange={this.onDatesChange} />
              ) : (
                ''
              )}

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