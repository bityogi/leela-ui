import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import { isEmpty } from 'lodash';

import RecurringWizard from './recurringWizard';
import validate from '../../validate';
import store from 'store';

class Recurring extends Component {

    state = {
        enableFormSubmission: true,
    }

    handleFormSubmit = (values) => {
    }

    handleRecurringSelection = (value) => {
        store.dispatch(change('event', 'frequency', value));
        store.dispatch(change('event', 'interval', null));
        store.dispatch(change('event', 'repeatUntil', null));
        store.dispatch(change('event', 'weekDays', []));
        store.dispatch(change('event', 'monthDaySelectionType', 0));
    }

    componentDidUpdate(prevProps) {
        const { valid, submitting, anyTouched } = this.props;
        const enabled = (valid && !submitting) || !anyTouched;
        const wasEnabled = (prevProps.valid && !prevProps.submitting) || !prevProps.anyTouched

        if (enabled !== wasEnabled) {
            this.setState({ enableFormSubmission: enabled });
        }
        
    }

    render() {
        const { handleSubmit, frequency } = this.props;
        const { enableFormSubmission } = this.state;

        return (
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Frequency
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        <Field
                            style={{ width:'80%', fontSize: '.9em' }}
                            name="frequency"
                            component={Select}
                            autoWidth={true}
                            onChange={this.handleRecurringSelection}
                            >
                            <MenuItem key={'Daily'} value={'Daily'}>Daily</MenuItem>
                            <MenuItem key={'Weekly'} value={'Weekly'}>Weekly</MenuItem>
                            <MenuItem key={'Monthly'} value={'Monthly'}>Montly</MenuItem>
                            <MenuItem key={'Yearly'} value={'Yearly'}>Yearly</MenuItem>
                        
                        </Field>
                    
                    </Typography>
                </form>
                { !isEmpty(frequency) && (
                    <RecurringWizard recurrenceType={frequency} enableSubmission={enableFormSubmission} />
                )}
            </Grid>
        );
    }
}

Recurring = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {},
})(Recurring)

const selector = formValueSelector('event')

Recurring = connect(state => {
    const frequency = selector(state, 'frequency');
   
    return {
        frequency,
    }
})(Recurring)

export default Recurring;