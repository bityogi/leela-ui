import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Switch } from 'redux-form-material-ui';
import moment from 'moment';
import { isEmpty } from 'lodash';

import styles from 'styles';
import DateTimePicker from 'components/common/dateTimePicker';
import Recurring from './Recurring';
import Sessions from './Sessions';
import validate from '../validate';


class ScheduleForm extends Component {

    state = {
        isRecurring : false,
        isMultiSession: false,
    }

    handleRecurringSwitch = (e) => {
        this.setState({ isRecurring: e.target.checked });
    }

    handleMultiSessionSwitch = (e) => {
        this.setState({ isMultiSession: e.target.checked });
    }

    handleFormSubmit = (values) => {
        console.log('schedule form values: ', values);
    }

    componentDidUpdate(prevProps) {
        const { valid, submitting, anyTouched, enableSubmission } = this.props;
        const enabled = (valid && !submitting) || !anyTouched;
        const wasEnabled = (prevProps.valid && !prevProps.submitting) || !prevProps.anyTouched

        if (enabled !== wasEnabled) {
            enableSubmission(enabled);
        }
    }

    render() {
        const { handleSubmit, start } = this.props;
        const { isRecurring, isMultiSession } = this.state;
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
                                    disabled={isMultiSession}
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
                                    checked={isMultiSession} 
                                    onChange={this.handleMultiSessionSwitch}
                                    disabled={isRecurring}
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
                    isMultiSession && (
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
    
    return {
        start,
    }
})(ScheduleForm)

export default withStyles(styles)(ScheduleForm);