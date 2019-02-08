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

import styles from './styles';
import Info from './info';
import Media from './media';
import Schedule from './schedule';
import PreReqs from './prereqs';
import Summary from './summary';

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const getSteps = () => {
  return [
    'Info',
    'Media',
    'Schedule',
    'Pre-requisites',
    'Confirm',
    'Done'
  ];
}

class Wizard extends Component {

  state = {
    activeStep: 0,
    receivingAccount: 'Home Account',
    repaimentAccount: 'Saving Account',
    termsChecked: false
  }

  componentDidMount() {
    
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTerms = event => {
    this.setState({ termsChecked: event.target.checked });
  };

  stepActions() {
    if(this.state.activeStep === 4) {
      return 'Accept';
    }
    if(this.state.activeStep === 5) {
      return 'Done';
    }
    return 'Next';
  }

  goToDashboard = event => {
    const queryString = this.props.location.search
    
    this.props.history.push({
      pathname: '/dashboard',
      search: queryString
    })
  }

  render() {

    const { classes } = this.props;
    const queryString = this.props.location.search
    const parsed = queryString ? qs.parse(queryString) : {}
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <Back />
                <div className={classes.stepContainer}>
                  <div className={classes.bigContainer}>
                    <Stepper classes={{root: classes.stepper}} activeStep={activeStep} alternativeLabel>
                      {steps.map(label => {
                        return (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                  { activeStep === 0 && (
                    <Info />
                  )}
                  { activeStep === 1 && (
                    <Media />
                  )}
                   { activeStep === 2 && (
                    <Schedule />
                  )}
                  { activeStep === 3 && (
                   <PreReqs />
                  )}
                  { activeStep === 4 && (
                    <Summary />
                  )}
                  { activeStep === 5 && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Congratulations <span role="img" aria-label="Congratulations">🎉</span>
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Your event has been published.
                          </Typography>
                          <Button fullWidth variant='outlined'>
                            Share your event!
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                  )}
                  
                  <div className={classes.flexBar}>
                    { activeStep !== 5 && (
                      <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                      size='large'
                      >
                        Back
                      </Button>
                    )}
                    <Button 
                      variant="contained"
                      color="primary"
                      onClick={activeStep !== 5 ? this.handleNext : this.goToDashboard}
                      size='large'
                    >
                      {this.stepActions()}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Wizard));