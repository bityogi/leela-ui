import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import styles from 'styles';
import DatePicker from './datePicker';

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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid item container xs={12}>
                    
                        <Grid item xs={12}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Start
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="startDate" component={DatePicker} />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                End
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="endDate" component={DatePicker} />
                            </Typography>
                        </Grid>
                    </Grid>

                </form>
            </MuiPickersUtilsProvider>
            
        )
    }
}

ScheduleForm = reduxForm({
    name: 'scheduleForm',
    validate,
    warn: () => {}
})(ScheduleForm);

export default withStyles(styles)(ScheduleForm);