import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import { isEmpty } from 'lodash';

import RecurringWizard from './recurringWizard';

const validate = (values) => {
    const errors = {}

    if (!values.frequency) {
        errors.frequency = 'Required'
    }

    return errors;
}

class Recurring extends Component {

    state = {
        recurrenceType: ''
    }

    handleFormSubmit = (values) => {

    }

    handleRecurringSelection = (value) => {
        this.setState({ recurrenceType: value });
    }

    render() {
        const { handleSubmit } = this.props;
        const { recurrenceType } = this.state;

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
                { !isEmpty(recurrenceType) && (
                    <RecurringWizard recurrenceType={recurrenceType} />
                )}
            </Grid>
        );
    }
}

Recurring = reduxForm({
    form: 'recurringForm',
    validate,
    warn: () => {},
})(Recurring)

export default Recurring;