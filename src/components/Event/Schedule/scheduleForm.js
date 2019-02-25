import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Switch } from 'redux-form-material-ui';
import moment from 'moment';

import styles from 'styles';
import store from 'store';
import DateTimePicker from 'components/common/dateTimePicker';
import Recurring from './Recurring';
import Sessions from './Sessions';
import validate from '../validate';




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
        const { 
            submitting, 
            enableSubmission, 
            isRecurring, 
            repeatUntil,
            start,
            end,
            frequency,
            interval,
        } = this.props;

        const isValid = () => {
            if (!(start) || !(end) ) {
                return false;
            } else {
                if (isRecurring === true) {
                    if (!frequency) {
                        return false
                    } else {
                        if (!interval) {
                            return false
                        } else if (!repeatUntil) {
                            return false
                        } else {
                            return true
                        }
                    }
                } else {
                    return true
                }
                
            }
        }
        const wasValid = () => {
            if ((!(prevProps.start) || !(prevProps.end))) {
                return false;
            } else {
                if (prevProps.isRecurring === true) {
                    if (!prevProps.frequency) {
                        return false
                    } else {
                        if (!prevProps.interval) {
                            return false
                        } else if (!prevProps.repeatUntil) {
                            return false
                        } else {
                            return true
                        }
                    }
                } else {
                    return true
                }
                
            }
        }
        let enabled = (isValid() && !submitting );
        const wasEnabled = (wasValid() && !prevProps.submitting)

        console.log('start: ', start);
        console.log('end: ', end);
        console.log('isRecurring: ', isRecurring);
        console.log('frequency: ', frequency);
        console.log('isValid: ', isValid());
        console.log('wasValid: ', wasValid());
        console.log('enabled: ', enabled);
        console.log('wasEnabled: ', wasEnabled);

        if (enabled !== wasEnabled) {
            enableSubmission(enabled);
        }
        
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
    return {
        start,
        end,
        isRecurring,
        hasSessions,
        repeatUntil,
        frequency,
        interval,

    }
})(ScheduleForm)

export default withStyles(styles)(ScheduleForm);