import React, { Component } from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { isEmpty } from 'lodash';

import styles from 'styles';
import Interval from './interval';
import WeekDaySelection from './weekdaySelection';
import MonthDaySelection from './MonthDaySelection';
import RepeatUntil from './repeatUntil';
import { AST_True } from 'terser';

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

    componentDidUpdate(prevProps) {
        if (prevProps.recurrenceType !== this.props.recurrenceType) {
            this.setState({ recurrenceType : this.props.recurrenceType });
        }
    }

    handleNext = () => {
        console.log('handle next for wizard ')
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    }

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    }

    showNext = () => {
        const { recurrenceType } = this.props;
        const { activeStep } = this.state;

        if (['Daily', 'Yearly'].includes(recurrenceType) && (activeStep === 1)) {
            return false
        } else if (['Weekly', 'Monthly'].includes(recurrenceType) && (activeStep === 2)) {
            return false
        } else {
            return true
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        console.log('nextProps.recurrenceType: ', nextProps.recurrenceType);
        console.log('prevState.recurrenceType: ', prevState.recurrenceType);
        if (nextProps.recurrenceType !== prevState.recurrenceType) {
            return { activeStep : 0 };
        } else {
            return null;
        }
    }

    enableSubmission = () => {
        const { 
            recurrenceType, 
            interval, 
            repeatUntil, 
            weekDays, 
            monthDaySelectionType,
            daysOfMonth,
            dayOfWeek : { number, day },

        } = this.props;
        const { activeStep } = this.state;

        console.log('wizard enableSubmission -- activeStep: ', activeStep);
        console.log('wizard enableSubmission -- interval: ', interval);
        console.log('wizard enableSubmission -- repeatUntil: ', repeatUntil);
        console.log('wizard enableSubmission -- weekDays: ', weekDays);
        console.log('wizard enableSubmission -- monthDaySelectionType: ', monthDaySelectionType);
        console.log('wizard enableSubmission -- daysOfMonth: ', daysOfMonth);
        console.log('wizard enableSubmission -- dayOfWeek.number: ', number);
        console.log('wizard enableSubmission -- dayOfWeek.day: ', day);

        if (activeStep === 0) {
            if (interval) {
                return true
            } else {
                return false
            }
        }

        if (activeStep === 1) {
            if (['Daily', 'Yearly'].includes(recurrenceType)) {
                if (repeatUntil) {
                    return true
                } else {
                    return false
                }
            }
            if (['Weekly'].includes(recurrenceType)) {
                if (!isEmpty(weekDays)) {
                    return true
                } else {
                    return false
                }
            }
            if (['Monthly'].includes(recurrenceType)) {
                if (monthDaySelectionType === 0) {
                    if(!isEmpty(daysOfMonth)) {
                        return true
                    } else {
                        return false
                    }
                } else if (monthDaySelectionType === 1) {
                    if (number && day) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    }

    render() {
        let enableSubmission = this.enableSubmission();
        console.log('enable submission for wizard: ', enableSubmission);
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
                            disabled={!enableSubmission}
                            style={{ display: (this.showNext()) ? '' : 'none' }}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </Grid>
        );
    }
}


const selector = formValueSelector('event')

RecurringWizard = connect(state => {
    const interval = selector(state, 'interval');
    const repeatUntil = selector(state, 'repeatUntil');
    const weekDays = selector(state, 'weekDays');
    const monthDaySelectionType = selector(state, 'monthDaySelectionType');
    const daysOfMonth = selector(state, 'daysOfMonth');
    const dayOfWeek_number = selector(state, 'dayOfWeek_number');
    const dayOfWeek_day = selector(state, 'dayOfWeek_day');

    return {
        interval,
        repeatUntil,
        weekDays,
        monthDaySelectionType,
        daysOfMonth,
        dayOfWeek : { number: dayOfWeek_number, day: dayOfWeek_day }
    }
})(RecurringWizard)

export default withStyles(styles)(RecurringWizard);