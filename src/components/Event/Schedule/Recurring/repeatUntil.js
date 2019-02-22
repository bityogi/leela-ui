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

// require('moment-recur');

class RepeatUntil extends Component {

    handleFormSubmit = (values) => {
        console.log('repeat until form values: ', values);
    }

    computeReptitions = () => {
        const { start, repeatUntil, interval, frequency } = this.props;
        if (repeatUntil) {
            console.log('start: ', start);
            console.log('repeatUntil: ', repeatUntil);
            console.log('interval: ', interval);
            console.log('frequency: ', frequency);
            
            // const recurrence = moment().recur(start, repeatUntil).every(interval).days();

            // console.log('recurrence is: ', recurrence);
            const startMoment = moment(start);
            const endMoment = moment(repeatUntil);
            let units;
            switch (frequency) {
                case 'Daily':
                    units = 'days';
                    break;
                case 'Weekly':
                    units = 'weeks';
                    break;
                case 'Monthly':
                    units = 'months';
                    break;
                case 'Yearly':
                    units = 'years';
                    break;
                default:
                    units = 'days';
            }
            console.log('units : ', units);
            const span = endMoment.diff(startMoment, units);
            console.log('interval span: ', span);
            const repititions = Math.floor(span/interval);

            console.log('repititions: ', repititions);
            return repititions;
        } else 
            return null;
        
    }

    render() {
        const { handleSubmit } = this.props;
        const repititions = this.computeReptitions();

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid container item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            <Field name="repeatUntil" component={DatePicker} label="Repeat Until" fullWidth />
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

    return {
        repeatUntil,
        start,
        interval,
        frequency,
    }
})(RepeatUntil)

export default withStyles(styles)(RepeatUntil);