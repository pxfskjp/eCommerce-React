import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from '../LogoutButton';
import Dialog from '@material-ui/core/Dialog';

import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import './css/MobileNavMenu.css';

// const useStyles = makeStyles(theme => ({
//   appBar: {
//     position: 'relative',
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
// }));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const MobileNavLink = props => {
//     return (
//         <NavLink 
//             to={props.route} 
//             className="mobile-nav-link" 
//             activeStyle={{ color: 'blue' }} 
//             onClick={this.handleClose}
//         >
//             {props.name}
//         </NavLink>
//     )
// }

class MobileNavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="down" ref={ref} {...props} />;
        });
    }
    

    handleClickOpen = () => {
        this.setState({ open: true });
        // event.preventDefault();
        // const openState = this.state.open ? false : true;
        // console.log(openState);
        // this.setState({ open: openState });
    }

    handleClose = () => {
        this.setState({ open: false });
      };
    
    render() {
        // const classes = useStyles();
        return (
            <div className="mobile-nav-container">
                <button className="toggle-menu-button" onClick={this.handleClickOpen}>
                    Menu
                </button>

                <Dialog
                    fullScreen
                    open={this.state.open}
                    TransitionComponent={this.Transition}
                    onClose={this.handleClose}
                    /*aria-labelledby="form-dialog-title"*/
                    className="mobile-nav-dialog"
                >
                    <div className="menu-container">
                        <NavLink to="/findtools" className="mobile-nav-link" activeStyle={{ color: 'blue' }} onClick={this.handleClose}>
                            Find Tools
                        </NavLink>

                        <NavLink to="/addtool" className="mobile-nav-link" activeStyle={{ color: 'blue' }} onClick={this.handleClose}>
                            Add a tool
                        </NavLink>

                        <NavLink to="/ownerdashboard" className="mobile-nav-link" activeStyle={{ color: 'blue' }} onClick={this.handleClose}> 
                            Owner Dashboard
                        </NavLink>

                        <NavLink to="/renterdashboard" className="mobile-nav-link" activeStyle={{ color: 'blue' }} onClick={this.handleClose}>
                            Renter Dashboard
                        </NavLink>

                        <NavLink to="/chat" className="mobile-nav-link" activeStyle={{ color: 'blue' }} onClick={this.handleClose}>
                            Messages
                        </NavLink>
                    
                        <NavLink to="/accountpage" className="mobile-nav-link" activeStyle={{ color: 'blue' }} onClick={this.handleClose}>
                            Account
                        </NavLink>
                    </div>
                    <div className="button-container">
                        <button onClick={this.handleClose}>
                            Close Menu
                        </button>
                        <button onClick={this.handleClose}>
                            <LogoutButton className="mobile-nav-link" />
                        </button>
                    </div>
                </Dialog>
            </div>
        )
    }
};

export default MobileNavMenu;
