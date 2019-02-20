import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';
import { isEmpty } from 'lodash';
import { createNumberMask } from 'redux-form-input-masks';

import styles from 'styles';
import NewByDate from './byDate';
import validate from 'components/Event/validate';

const currencyMask = createNumberMask({
    prefix: 'US$ ',
    decimalPlaces: 2,
    locale: 'en-US',
})

class PricingForm extends Component {

    state = {
        newByDate: {},
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
        const { handleSubmit, classes, sessions, recurring } = this.props;
        
        return (
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Price
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field 
                                    name="price" 
                                    component={TextField} 
                                    label="General Price" 
                                    {...currencyMask}
                                />
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h4" gutterBottom>
                                <FieldArray name="pricesByDate" component={NewByDate} classes={classes} />
                            </Typography>
                        </Grid>
                    </Grid>
                    
                </form>
        )
    }
}

PricingForm = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {}
})(PricingForm);

export default withStyles(styles)(PricingForm);