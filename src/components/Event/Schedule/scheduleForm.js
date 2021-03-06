import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Switch } from 'redux-form-material-ui';
import moment from 'moment';
import { isEmpty, pick } from 'lodash';

import styles from 'styles';
import store from 'store';
import DateTimePicker from 'components/common/dateTimePicker';
import Recurring from './Recurring';
import Sessions from './Sessions';
import validate from '../validate';
import validateSchedule from 'components/Event/validateSchedule';




class ScheduleForm extends Component {

    
    handleRecurringSwitch = (e) => {
        store.dispatch(change('event', 'isRecurring', e.target.checked));
    }

    handleMultiSessionSwitch = (e) => {
        store.dispatch(change('event', 'hasSessions', e.target.checked));
    }

    handleFormSubmit = (values) => {
        console.log('schedule form values: ', values);
    }

    componentDidUpdate(prevProps) {
        const { enableSubmission } = this.props;

        const values = pick(this.props, [
            'submitting', 
            'enableSubmission', 
            'isRecurring', 
            'repeatUntil',
            'start',
            'end',
            'frequency',
            'interval',
            'weekDays',
            'monthDaySelectionType',
            'daysOfMonth',
            'dayOfWeek_number',
            'dayOfWeek_day',
            'hasSessions',
            'sessions',
        ]);

        const isValid = () => {
            const errors = validateSchedule(values);
            console.log('errors from validateSchedule: ', errors);
            if (isEmpty(errors)) {
                return true
            } else {
                return false
            }
        }

        let enabled = isValid();
    
        enableSubmission(enabled);
    }

    render() {
        const { handleSubmit, start, end, isRecurring, hasSessions } = this.props;
        const datesEntered = (start) && (end);
        //If there is a start date/time, use that as the initial value for end date/time
        const initialEndDate = (start) ? moment(start).startOf('hour').add(1, 'hours') : moment().startOf('hour').add(1, 'hours'); 

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Typography variant="h5" gutterBottom>
                                <Field name="start" component={DateTimePicker} label="Start" />
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={6}>
                            <Typography variant="h5" gutterBottom>
                                <Field name="end" component={DateTimePicker} label="End" initialFocusedDate={initialEndDate} />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Recurring
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field 
                                    name="isRecurring" 
                                    component={Switch} 
                                    label="Recurring" 
                                    checked={isRecurring} 
                                    onChange={this.handleRecurringSwitch}
                                    disabled={hasSessions || !datesEntered}
                                />
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Multiple Sessions
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field 
                                    name="hasSessions" 
                                    component={Switch} 
                                    label="Recurring" 
                                    checked={hasSessions} 
                                    onChange={this.handleMultiSessionSwitch}
                                    disabled={isRecurring || !datesEntered}
                                />
                            </Typography>
                        </Grid>
                        
                        
                    </Grid>
                </form>
                { 
                    isRecurring && (
                        <Recurring />
                    )
                }
                {
                    hasSessions && (
                        <Sessions />
                    )
                }
                        
            </div>
        )
    }
}

ScheduleForm = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {}
})(ScheduleForm);

const selector = formValueSelector('event')

ScheduleForm = connect(state => {
    const start = selector(state, 'start');
    const end = selector(state, 'end');
    const isRecurring = selector(state, 'isRecurring');
    const hasSessions = selector(state, 'hasSessions');
    const repeatUntil = selector(state, 'repeatUntil');
    const frequency = selector(state, 'frequency');
    const interval = selector(state, 'interval');
    const weekDays = selector(state, 'weekDays');
    const monthDaySelectionType = selector(state, 'monthDaySelectionType');
    const daysOfMonth = selector(state, 'daysOfMonth');
    const dayOfWeek_number = selector(state, 'dayOfWeek_number');
    const dayOfWeek_day = selector(state, 'dayOfWeek_day');
    const sessions = selector(state, 'sessions');
    return {
        start,
        end,
        isRecurring,
        hasSessions,
        repeatUntil,
        frequency,
        interval,
        weekDays,
        monthDaySelectionType,
        daysOfMonth,
        dayOfWeek_number,
        dayOfWeek_day,
        sessions,

    }
})(ScheduleForm)

export default withStyles(styles)(ScheduleForm);