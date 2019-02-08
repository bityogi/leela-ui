import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    return errors;
}

class InfoForm extends Component {

    handleFormSubmit = (values) => {
        console.log('Form values for event info: ', values);
    }

    render() {
        const { classes, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div variant="outlined" className={classes.formControl}>
                    <label>Title</label>
                    <div>
                        <Field name="title" component={TextField}  />
                    </div>
                </div>

              
            </form>
        )
    }

}

InfoForm = reduxForm({
    form: 'eventInfo',
    validate,
    warn: () => {}
})(InfoForm)

export default withStyles(styles)(InfoForm);