import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Switch, TextField } from 'redux-form-material-ui';

import styles from 'styles';


const validate = (values) => {
    const errors = {}

    if (!values.startDate) {
        errors.startDate = 'Required'
    }

    return errors;
}

class PricingForm extends Component {

    state = {
        byDates: [],
    }

    handleRecurringSwitch = (e) => {
        this.setState({ isRecurring: e.target.checked });
    }

    handleMultiSessionSwitch = (e) => {
        this.setState({ isMultiSession: e.target.checked });
    }

    handleFormSubmit = (values) => {
        console.log('schedule form values: ', values);
    }

    render() {
        const { handleSubmit } = this.props;
        const { isRecurring, isMultiSession } = this.state;

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Price
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="Price" component={TextField} label="General Price" />
                            </Typography>
                        </Grid>
                    </Grid>
                    
                </form>
                
                        
            </div>
        )
    }
}

PricingForm = reduxForm({
    form: 'pricingForm',
    validate,
    warn: () => {}
})(PricingForm);

export default withStyles(styles)(PricingForm);