import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import Back from 'components/common/Back';
import styles from 'styles';
import LocationForm from './locationForm';


class Locations extends Component {
  
  goToDashboard = event => {
    const queryString = this.props.location.search
    
    this.props.history.push({
      pathname: '/dashboard',
      search: queryString
    })
  }

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <Back />
                <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                    
                      <div className={classes.stepContainer}>
                        
                        <LocationForm />
                        
                        
                      </div>
                    </Paper>
                  </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Locations));