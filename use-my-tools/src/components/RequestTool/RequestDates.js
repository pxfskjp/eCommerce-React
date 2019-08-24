import React from 'react';
import { withRouter, Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import DateRangePickerWrapper from '../ReactDates/DateRangePicker';
import moment from "moment";
import ConfirmRentalDialog from '../Renter/ConfirmRentalDialog';

// import isSameDay from 'react-dates/lib/utils/isSameDay';

import axios from 'axios';

const styles = {
    mainContainer: {
        height: 410,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 5,
        borderTop: '1px solid grey',
        borderBottom: '1px solid grey'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    dialogContent: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'space-around'
  },
  bottomButtons: {
    display: 'flex',
    justifyContent: 'flex-start'
  }
};

class RequestDates extends React.Component {
  state = {
    open: true,
    startDate: null,
    endDate: null,
    blockedDateRanges: [],
    blockedDays: [],
    blockedDaysUpdated: false,
    datesSubmitted: false,
    error: null
  };

  componentDidMount() {
    const toolId = this.props.toolId;
    console.log(toolId);
    axios.get(`/api/rentals/tool/reserveddates/${toolId}`)
      .then(dates => {
        const dateRanges = dates.data;  // reserved dates come back as ranges with start and end dates
        console.log('RequestDates CDM dateRanges from reserved dates table: ', dateRanges);
        let blockedDays = [];
        for (let i = 0; i < dateRanges.length; i++) {
          // blockedDays.push(this.getDatesInRange(dateRanges[i]));
          let datesArray = this.getDatesInRange(dateRanges[i]);
          console.log('RequestDates CDM datesArray: ', datesArray);
          for (let d = 0; d < datesArray.length; d++) {
            blockedDays.push(datesArray[d]);
          }
          console.log('RequestDates CDM blockedDays: ', blockedDays);
        }
        // console.log('blockedDays:', blockedDays);
        this.setState({ 
          open: true,
          blockedDays: blockedDays,
          blockedDaysUpdated: true 
        }, () => console.log('RequestDates state.blockedDays: ', blockedDays));
        // this.setState({ blockedDateRanges: dates.data }, () => console.log('PopUp state.blockedDateRanges:', this.state.blockedDateRanges));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
  }

  isDayBlocked = day => {
    // console.log('PopUp state.blockedDays on first isDayBlocked call', this.state.blockedDays);
    // console.log('isDayBlocked moment(day):', moment(day).format('YYYY-MM-DD'));
    // console.log(this.state.blockedDays.includes(moment(day)));
    // return this.state.blockedDays.includes(moment(day));
    // console.log('PopUp isDayBlocked called.');
    const blockedDays = this.state.blockedDays;
    
    const day1 = moment(day).format('YYYY-MM-DD');
    // console.log('isDayBlocked day: ', day1);
    if (blockedDays.includes(day1)) {
      return true;
    }
    return false;
  }

  getDatesInRange = ({ startDate, endDate }) => {
    let datesArray = [];
    
    // console.log('RequestDates getDatesInRange startDate: ', startDate);
    // console.log('RequestDates getDatesInRange endDate: ', endDate);

    let currentDate = moment.utc(startDate);
    // console.log('RequestDates getDatesInRange currentDate: ', currentDate);

    let stopDate = moment.utc(endDate);
    // console.log('RequestDates getDatesInRange stopDate: ', stopDate);
    
    while (currentDate <= stopDate) {
      datesArray.push(moment(currentDate).format('YYYY-MM-DD'));
      // datesArray.push(moment(currentDate));
      currentDate = moment(currentDate).add(1, 'days');
    }
    // console.log('RequestDates getDatesInRange datesArray: ', datesArray);
    return datesArray;
  }

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  //   const toolId = this.props.toolId;
  //   axios.get(`/api/rentals/tool/reserveddates/${toolId}`)
  //     .then(dates => {
  //       const dateRanges = dates.data;  // reserved dates come back as ranges with start and end dates
  //       let blockedDays = [];
  //       for (let i = 0; i < dateRanges.length; i++) {
  //         // blockedDays.push(this.getDatesInRange(dateRanges[i]));
  //         let datesArray = this.getDatesInRange(dateRanges[i]);
  //         for (let d = 0; d < datesArray.length; d++) {
  //           blockedDays.push(datesArray[d]);
  //         }
  //       }
  //       // console.log('blockedDays:', blockedDays);
  //       this.setState({ 
  //         open: true,
  //         blockedDays: blockedDays,
  //         blockedDaysUpdated: true 
  //       });
  //       // this.setState({ blockedDateRanges: dates.data }, () => console.log('PopUp state.blockedDateRanges:', this.state.blockedDateRanges));
  //     })
  //     .catch(error => {
  //       this.setState({ error: error.message });
  //     })
  // };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate }, () => console.log('PopUp state: ', this.state));
  };

  onSubmit = () => {
    const { startDate, endDate } = this.state;
    const createDate = moment(Date.now());
    const { toolId, resType } = this.props;

    const reservationData = { 
      toolId,
      resType,
      startDate, 
      endDate,
      createDate 
    };

    // this.props.confirmRental(reservationData);

    // this.props.history.push({
    //   pathname: '/confirmrental',
    //   state: {
    //     reservationData
    //   } 
    // });
    
    // // create new Rental; API creates reserved dates then Rental:
    // axios.post('/api/rentals/newrental', reservationData)
    //     .then(response => {
    //         console.log('Rental created with response: ', response);
    //         this.props.history.push({
    //           pathname: `/rentalview/${response.data}/renter`
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //         this.setState({ error: error.message });
    //     })
  };


  render() {
    const { classes } = this.props;
    const blockedDaysUpdated = this.state.blockedDaysUpdated;
    const userType = this.props.userType;
    return (
        <div>
          <div className={classes.mainContainer}>
            <div>
                <div className={classes.textContainer}>
                    <Typography gutterBottom variant="h6" component="h2">Availability</Typography>
                    <div className={classes.dialogContent}>
                    {userType === "renter" ? (
                        <Typography>
                        Select dates to reserve this tool:
                        </Typography>
                    ) : (
                        <Typography>
                        Select dates to block from rental reservations:
                        </Typography>
                    )}
                </div>
                
                {blockedDaysUpdated ? (
                    <DateRangePickerWrapper isDayBlocked={this.isDayBlocked} onDatesChange={this.onDatesChange} />
                ) : (
                    ''
                )}

                </div>
            </div>
              
            <div className={classes.bottomButtons}>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <ConfirmRentalDialog />
              {/* <Button onClick={this.onSubmit} color="primary">
                Submit
              </Button> */}
            </div>
            
          </div>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
    );
  }
}

export default withRouter(withStyles(styles)(RequestDates));