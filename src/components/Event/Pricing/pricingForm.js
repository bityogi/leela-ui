import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';
import { isEmpty } from 'lodash';

import styles from 'styles';
import NewByDate from './byDate';

const validate = (values) => {
    const errors = {}

    if (!values.startDate) {
        errors.startDate = 'Required'
    }

    return errors;
}

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

    onByDatePricingAdded = (values, byDate) => {
        this.setState({
            newByDate: {},
            byDates: [ ...this.state.byDates, { ...byDate, ...values } ]
        });
    }

    addNewByDatePricing = () => {
        const newByDate = {
            index: this.state.byDates.length,
        }
        this.setState({ 
            newByDate
        });
    }

    render() {
        const { handleSubmit, classes, sessions, recurring } = this.props;
        const {  newByDate } = this.state;

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
                        <Grid item xs={12}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Add Pricing based on Date 
                            </Typography>
                            <Button 
                                variant="outlined" 
                                size="small" 
                                className={classes.inlineButton} 
                                onClick={() => this.addNewByDatePricing()}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    
                </form>
                <div>
                    { 
                        !isEmpty(newByDate) && <NewByDate onByDatePricingAdded={this.onByDatePricingAdded} session={NewByDate} />
                    }
                </div>
                        
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