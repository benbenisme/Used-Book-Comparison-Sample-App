import React from 'react';
import {
  Jumbotron,
} from 'reactstrap';
import {
    Grid
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  Link
} from "react-router-dom";

const HomeRoute = () => {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item>
                <Jumbotron>
                    <h1 className="display-3">Kings Books</h1>
                    <p className="lead">Welcome to Kings Books, the online encyclopedia for books and reading material.</p>
                    <Button color="primary"><Link to="/browse">Click here to browse</Link></Button>
                </Jumbotron>  
            </Grid>                          
        </Grid>
    )    
}
export default HomeRoute;