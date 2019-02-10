import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

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