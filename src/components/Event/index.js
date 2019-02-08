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
    if(this.state.activeStep === 3) {
      return 'Accept';
    }
    if(this.state.activeStep === 4) {
      return 'Send';
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
                    <div className={classes.bigContainer}>
                      <Paper className={classes.paper}>
                        <div style={{marginBottom: 24}}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Terms & Conditions
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Please read through and accept the terms & conditions
                          </Typography>
                        </div>
                        <div style={{ height: 330, padding: 16, border: '2px solid #ccc', borderRadius: '3px', overflowY: 'scroll' }}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            1. Your agreement
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                          By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.

PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                          </Typography>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            2. Privacy
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices.
                            By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.

PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                          </Typography>
                        </div>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={this.state.termsChecked}
                                onChange={this.handleTerms}
                                value='check'
                              />
                            }
                            label="I have read and understood the terms & conditions"
                          />
                        </FormGroup>
                      </Paper>
                    </div>
                  )}
                  { activeStep === 5 && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Sign & confirm
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Sign and confirm your agreement
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  { (activeStep === 5 || activeStep === 6) && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Congratulations <span role="img" aria-label="Congratulations">🎉</span>
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            We have now a positive response
                          </Typography>
                          <Button fullWidth variant='outlined'>
                            Download the service invoice or whatever
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
                      disabled={this.state.activeStep === 3 && !this.state.termsChecked}
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