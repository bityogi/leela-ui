import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import styles from 'styles';
import DatePicker from './datePicker';
import TimePicker from './timePicker';
import Switch from './switch';
import Recurring from './Recurring';

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
    }

    handleRecurringSwitch = (e) => {
        this.setState({ isRecurring: e.target.checked });
    }

    handleFormSubmit = (values) => {
        console.log('schedule form values: ', values);
    }

    render() {
        const { classes, handleSubmit } = this.props;
        const { isRecurring } = this.state;

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
                        <Grid item xs={12}>
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