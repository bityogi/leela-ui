import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { TextField, Select } from 'redux-form-material-ui';

const validate = (values) => {
    const errors = {}

    if (!values.startDate) {
        errors.startDate = 'Required'
    }

    return errors;
}

class Recurring extends Component {

    handleFormSubmit = (values) => {

    }

    render() {
        const { handleSubmit } = this.props;
        return (
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
                        >
                        <MenuItem key={'Daily'} value={'Daily'}>Daily</MenuItem>
                        <MenuItem key={'Weekly'} value={'Weekly'}>Weekly</MenuItem>
                        <MenuItem key={'Monthly'} value={'Monthly'}>Montly</MenuItem>
                        <MenuItem key={'Yearly'} value={'Yearly'}>Yearly</MenuItem>
                    
                    </Field>
                   
                </Typography>
            </form>
        );
    }
}

Recurring = reduxForm({
    form: 'recurringForm',
    validate,
    warn: () => {},
})

export default Recurring;