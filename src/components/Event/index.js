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

import Back from 'components/common/Back';

import styles from 'styles';
import Info from './Info';
import Media from './Media';
import Schedule from './Schedule';
import PreReqs from './PreReqs';
import Pricing from './Pricing';
import Summary from './summary';
import StepActions from './stepActions';

const getSteps = () => {
  return [
    'Info',
    'Media',
    'Schedule',
    'Pre-requisites',
    'Pricing',
    'Confirm',
    'Done'
  ];
}

class Wizard extends Component {

  state = {
    activeStep: 0,
    enableFormSubmission: false,
  }

  handleNext = () => {
    //Leave the form submittable by default for these steps (Media, Pre-Reqs)
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      enableFormSubmission: ([0, 2].includes(state.activeStep)) ? true : false, 
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      enableFormSubmission: true,
    }));
  };

  enableSubmission = (enabled) => {
    console.log('enableSubmission: ', enabled);
    this.setState({
      enableFormSubmission: enabled
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  goToDashboard = event => {
    const queryString = this.props.location.search
    
    this.props.history.push({
      pathname: '/dashboard',
      search: queryString
    })
  }

  render() {

    const { classes } = this.props;
   
   
    const steps = getSteps();
    const { activeStep, enableFormSubmission } = this.state;

    
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
                    <Info enableSubmission={this.enableSubmission} isSubmissionEnabled={enableFormSubmission} /> 
                  )}
                  { activeStep === 1 && (
                    <Media enableSubmission={this.enableSubmission} isSubmissionEnabled={enableFormSubmission}/>
                  )}
                   { activeStep === 2 && (
                    <Schedule enableSubmission={this.enableSubmission} />
                  )}
                  { activeStep === 3 && (
                   <PreReqs enableSubmission={this.enableSubmission} />
                  )}
                  { activeStep === 4 && (
                    <Pricing enableSubmission={this.enableSubmission} />
                  )}
                  { activeStep === 5 && (
                    <Summary />
                  )}
                  { activeStep === 6 && (
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
                  
                  <StepActions 
                    activeStep={activeStep} 
                    handleBack={this.handleBack} 
                    handleNext={this.handleNext} 
                    goToDashboard={this.goToDashboard} 
                    enableFormSubmission={enableFormSubmission}
                  />
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