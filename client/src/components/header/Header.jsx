import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
}));

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} style={{color: "white"}} aria-label="menu">
                        <MenuIcon />  
                    </IconButton>
                    <Button style={{color: "white"}}><Link style={{ textDecoration: 'none', color: "white" }} to="/browse">Browse</Link></Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header