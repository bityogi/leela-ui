import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import styles from 'styles';
import DatePicker from './datePicker';
import TimePicker from './timePicker';

const validate = (values) => {
    const errors = {}

    if (!values.startDate) {
        errors.startDate = 'Required'
    }

    return errors;
}

class ScheduleForm extends Component {

    handleFormSubmit = (values) => {
        console.log('schedule form values: ', values);
    }

    render() {
        const { classes, handleSubmit } = this.props;

        return (
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

                </form>
        )
    }
}

ScheduleForm = reduxForm({
    form: 'scheduleForm',
    validate,
    warn: () => {}
})(ScheduleForm);

export default withStyles(styles)(ScheduleForm);