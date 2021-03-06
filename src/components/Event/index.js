import React, { Component } from 'react';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'

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
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      enableFormSubmission: true,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      enableFormSubmission: true,
    }));
  };

  enableSubmission = (enabled) => {
    this.setState({
      enableFormSubmission: enabled
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
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
                  <div>
                       
                    { activeStep === 0 && (
                      <Info enableSubmission={this.enableSubmission} isSubmissionEnabled={enableFormSubmission} /> 
                    )}
                    { activeStep === 1 && (
                      <Media enableSubmission={this.enableSubmission} isSubmissionEnabled={enableFormSubmission} />
                    )}
                    { activeStep === 2 && (
                      <Schedule enableSubmission={this.enableSubmission} isSubmissionEnabled={enableFormSubmission} />
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
                    <div className={classes.bigContainer}>
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

                  </div>
                  
                  
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
        
    )
  }
}



const enhance = compose(
  withStyles(styles),
  withRouter,
)

export default enhance(Wizard);