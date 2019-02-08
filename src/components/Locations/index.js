import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import qs from 'query-string';

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
                        
                        <div className={classes.flexBar}>
                          <Button
                          onClick={this.handleBack}
                          className={classes.backButton}
                          size='large'
                          >
                              Back
                          </Button>
                      
                          <Button 
                            variant="contained"
                            color="primary"
                            onClick={this.goToDashboard}
                            size='large'
                          >
                            Done
                          </Button>
                        </div>
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