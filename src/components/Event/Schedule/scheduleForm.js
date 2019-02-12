import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Switch } from 'redux-form-material-ui';

import styles from 'styles';
import DatePicker from 'components/common/datePicker';
import TimePicker from './timePicker';
import Recurring from './Recurring';
import Sessions from './Sessions';

const validate = (values) => {
    const errors = {}

    if (!values.startDate) {
        errors.startDate = 'Required'
    }

    return errors;
}

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

    render() {
        const { handleSubmit } = this.props;
        const { isRecurring, isMultiSession } = this.state;

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid item container xs={12}>
                    
                        <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Start
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="startDate" component={DatePicker} label="Start Date" />
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Time
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="startTime" component={TimePicker} label="Start Time" />
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                End
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="endDate" component={DatePicker} label="End Date" />
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Time
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="endTime" component={TimePicker} label="End Time" />
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
                                    name="recurring" 
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
                                    name="recurring" 
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
    form: 'scheduleForm',
    validate,
    warn: () => {}
})(ScheduleForm);

export default withStyles(styles)(ScheduleForm);