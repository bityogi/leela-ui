import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import styles from 'styles';


const getSteps = (recurrenceType) => {
    const steps = {
        Daily : [
            'Interval',
            'Repeat Until'
        ],
        Weekly: [
            'Interval',
            'Week Days',
            'Repeat Until'
        ],
        Monthly: [
            'Interval',
            'Month Days',
            'Repeat Until'
        ],
        Yearly: [
            'Interval',
            'Repeat Until'
        ]
    };

    return steps[recurrenceType];
}

class RecurringWizard extends Component {

    state = {
        activeStep: 0,
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    }

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    }

    render() {
        const { classes, recurrenceType } = this.props;
        const { activeStep } = this.state;
        const steps = getSteps(recurrenceType);

        return (
            <Grid container item xs={12}>
                <div className={classes.stepContainer}>
                    <div className={classes.bigContainer}>
                        <Stepper classes={{ root: classes.stepper }} activeStep={activeStep} alternativeLabel>
                            {steps.map(label => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </div>

                    <div className={classes.smallContainer}>
                    { activeStep === 0 && (
                        <div>
                            Enter Interval Information
                        </div>
                    )}
                    </div>    

                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(RecurringWizard);