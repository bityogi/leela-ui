import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';

const validate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = 'Required'
    }

    if (!values.address1) {
        errors.address1 = 'Required'
    }

    if (!values.city) {
        errors.city = 'Required'
    }

    if (!values.zipcode) {
        errors.zipcode = 'Required'
    }

    return errors;
}

class LocationForm extends Component {

    handleFormSubmit = (values) => {
        console.log('Form values for event info: ', values);
    }

    render() {
        const { classes, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item container xs={12}>
                
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Name
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="name" component={TextField}  />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Address1
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="address1" component={TextField}  />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Address2
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="address2" component={TextField}  />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            City
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="city" component={TextField}  />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            State
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field
                                style={{ width:'80%', fontSize: '.9em' }}
                                name="location"
                                component={Select}
                                autoWidth={true}
                                >
                                <MenuItem key={'CA'} value={1}>CA</MenuItem>
                                <MenuItem key={'NC'} value={2}>NC</MenuItem>
                            
                            </Field>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Zipcode
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="zipcode" component={TextField}  />
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Country
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="country" component={TextField}  />
                        </Typography>
                    </Grid>
                </Grid>

            </form>
        )
    }

}

LocationForm = reduxForm({
    form: 'locationForm',
    validate,
    warn: () => {}
})(LocationForm)

export default withStyles(styles)(LocationForm);