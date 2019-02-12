import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import styles from 'styles';
import Interval from './interval';
import WeekDaySelection from './weekdaySelection';
import MonthDaySelection from './MonthDaySelection';
import RepeatUntil from './repeatUntil';

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
        recurrenceType: 'Daily',
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.recurrenceType !== prevState.recurrenceType) {
            return { activeStep : 0 };
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.recurrenceType !== this.props.recurrenceType) {
            this.setState({ recurrenceType : this.props.recurrenceType });
        }
    }

    render() {
        const { classes, recurrenceType } = this.props;
        const { activeStep } = this.state;
        const steps = getSteps(recurrenceType);

        let showRepeatUntil = false;
        if (activeStep === 1 && (['Daily', 'Yearly'].includes(recurrenceType)) ) {
            showRepeatUntil = true;
        }

        if (activeStep === 2 && (['Weekly', 'Monthly'].includes(recurrenceType)) ) {
            showRepeatUntil = true;
        }

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
                        <Interval recurrenceType={recurrenceType} />
                    )}

                    {
                        activeStep === 1 && recurrenceType === 'Weekly' && (
                            <WeekDaySelection />
                        )
                    }
                    {
                        activeStep === 1 && recurrenceType === 'Monthly' && (
                            <MonthDaySelection />
                        )
                    }
                    { 
                        ( showRepeatUntil ) && <RepeatUntil />
                    }
                    </div>    
                    <div className={classes.flexBar}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.backButton}
                            size='small'
                        >
                            Back
                        </Button>

                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            size='small'
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(RecurringWizard);