import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DateRangePickerWrapper from '../ReactDates/DateRangePicker';
import moment from "moment";
// import isSameDay from 'react-dates/lib/utils/isSameDay';

import axios from 'axios';


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
    datesSubmitted: false,
    error: null
  };

  isDayBlocked = day => {
    // console.log('PopUp state.blockedDays on first isDayBlocked call', this.state.blockedDays);
    // console.log('isDayBlocked moment(day):', moment(day).format('YYYY-MM-DD'));
    // console.log(this.state.blockedDays.includes(moment(day)));
    // return this.state.blockedDays.includes(moment(day));
    // console.log('PopUp isDayBlocked called.');
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
    // console.log('datesArray: ', datesArray);
    return datesArray;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    const toolId = this.props.toolId;
    axios.get(`/api/tools/tool/reserveddates/${toolId}`)
      .then(dates => {
        const dateRanges = dates.data;  // reserved dates come back as ranges with start and end dates
        let blockedDays = [];
        for (let i = 0; i < dateRanges.length; i++) {
          // blockedDays.push(this.getDatesInRange(dateRanges[i]));
          let datesArray = this.getDatesInRange(dateRanges[i]);
          for (let d = 0; d < datesArray.length; d++) {
            blockedDays.push(datesArray[d]);
          }
        }
        // console.log('blockedDays:', blockedDays);
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

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate }, () => console.log('PopUp state: ', this.state));
  };

  onSubmit = () => {
    let { startDate, endDate } = this.state;

    let reservationData = { 
      toolId: this.props.toolId,
      resType: this.props.userType,
      startDate: this.state.startDate, 
      endDate: this.state.endDate 
    };

    // Add the dates that were just reserved to state.blockedDays array:
      // This fixes bug where after submitting dates, on the next time you click 'manage dates',
      // the recently reserved dates are not blocked until you reload page
    let blockedDays = this.state.blockedDays;
    let datesArray = this.getDatesInRange({ startDate, endDate });
    for (let d = 0; d < datesArray.length; d++) {
      blockedDays.push(datesArray[d]);
    }
    this.setState({ blockedDays });
    
    // store the selected date range in db:
    axios.post('/api/tools/reserveDates', reservationData)
        .then(response => {
            console.log('Dates reservation created with response: ', response);
            //this.handleClose();
            this.setState({ datesSubmitted: true });
        })
        .catch(error => {
            console.log(error.message);
            this.setState({ error: error.message });
        })
  };

  render() {
    const { classes } = this.props;
    const blockedDaysUpdated = this.state.blockedDaysUpdated;
    const userType = this.props.userType;
    return (
        <div>
          {userType === "renter" ? (
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              Rent this tool
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              Manage Dates
            </Button>
          )}
          
          <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Select Dates</DialogTitle>

            <DialogContent className={classes.dialogContent}>
              {userType === "renter" ? (
                <DialogContentText>
                  Select dates to reserve this tool:
                </DialogContentText>
              ) : (
                <DialogContentText>
                  Select dates to block from rental reservations:
                </DialogContentText>
              )}
              
              
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