import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import styles from 'styles';
import DatePicker from 'components/common/datePicker';
import validate from 'components/Event/validate';

require('moment-recur');

class RepeatUntil extends Component {

    handleFormSubmit = (values) => {
        console.log('repeat until form values: ', values);
    }

    computeReptitions = () => {
        const { 
            start, 
            repeatUntil, 
            interval, 
            frequency, 
            weekDays, 
            monthDaySelectionType,
            daysOfMonth,
            dayOfWeek_number,
            dayOfWeek_day,
        } = this.props;

        let repititions;
        
        //Only compute the repitions, if a repeatUntil value has been specified
        if (repeatUntil) {
            
            let schedules;

            if (frequency === 'Monthly') {
                if (monthDaySelectionType === 0) {
                    schedules = moment().recur(moment(start).format('YYYY-MM-DD'), moment(repeatUntil).format('YYYY-MM-DD')).every(daysOfMonth).daysOfMonth();
                    
                } else if (monthDaySelectionType === 1) {
                    schedules = moment().recur(moment(start).format('YYYY-MM-DD'), moment(repeatUntil).format('YYYY-MM-DD')).every([dayOfWeek_number]).weeksOfMonth().every(dayOfWeek_day).daysOfWeek();
                }
            } else if (frequency === 'Weekly') {
                schedules = moment().recur(moment(start).format('YYYY-MM-DD'), moment(repeatUntil).format('YYYY-MM-DD')).every(weekDays).daysOfWeek();
            } else if (frequency === 'Yearly') {
                schedules = moment().recur(moment(start).format('YYYY-MM-DD'), moment(repeatUntil).format('YYYY-MM-DD')).every(interval).years();
            } else if (frequency === 'Daily') {
                schedules = moment().recur(moment(start).format('YYYY-MM-DD'), moment(repeatUntil).format('YYYY-MM-DD')).every(interval).days();
            } else {
                return null; //Invalid frequency value
            }

            repititions = schedules.all("L").length;
            
            return repititions;
        } else 
            return null;
        
    }

    render() {
        const { handleSubmit, valid, start } = this.props;
        const repititions = valid ? this.computeReptitions() : null;
        const maxDateForRepeatUntil = moment().add('years', 5);
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid container item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            <Field 
                                name="repeatUntil" 
                                component={DatePicker} 
                                label="Repeat Until" 
                                fullWidth 
                                maxDate={maxDateForRepeatUntil}
                                minDate={start} />
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {(repititions) ? `This event will repeat ${repititions} times` : ''}
                        </Typography>
                    </Grid>
                </form>
            </div>
        )
    }
}

RepeatUntil = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {}
})(RepeatUntil);

const selector = formValueSelector('event')

RepeatUntil = connect(state => {
    const repeatUntil = selector(state, 'repeatUntil');
    const start = selector(state, 'start');
    const interval = selector(state, 'interval');
    const frequency = selector(state, 'frequency');
    const weekDays = selector(state, 'weekDays');
    const monthDaySelectionType = selector(state, 'monthDaySelectionType');
    const daysOfMonth = selector(state, 'daysOfMonth');
    const dayOfWeek_number = selector(state, 'dayOfWeek_number');
    const dayOfWeek_day = selector(state, 'dayOfWeek_day');


    return {
        repeatUntil,
        start,
        interval,
        frequency,
        weekDays,
        monthDaySelectionType,
        daysOfMonth,
        dayOfWeek_number,
        dayOfWeek_day,
    }
})(RepeatUntil)

export default withStyles(styles)(RepeatUntil);