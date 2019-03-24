import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'redux-form-material-ui';
import { filter, pick, isEmpty } from 'lodash';
import Divider from '@material-ui/core/Divider';

import styles from 'styles';
import NewByDate from './byDate';
import ByQuestion from './byQuestion';
import BySession from './bySession';
import validate from 'components/Event/validate';
import validatePriceByDate from './validatePricingByDate';
import validatePricing from 'components/Event/validatePricing';


class PricingForm extends Component {

    componentDidUpdate(prevProps) {
        const { enableSubmission } = this.props;
        const values = pick(this.props, [
            'pricesByDate',
            'questions',
            'sessions',
            'price',
            'start',
        ]);

        const isValid = () => {
            const errors = validatePricing(values);
            console.log('errors from validatePricing: ', errors);
            if (isEmpty(errors)) {
                return true
            } else {
                return false
            }
        }

        let enabled = isValid();
    
        enableSubmission(enabled);
        
    }

    
    render() {
        const { classes, sessions, questions } = this.props;

        const boolQuestions = filter(questions, q => { return q.type === 'YesNo' && q.affectPrice === true });
        return (
            <div>
                <form>
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
                                    type="number"
                                    parse={value => Number(value)}
                                />
                            </Typography>
                            <Divider />
                        </Grid>
                       
                        <Grid>
                            <Typography variant="h4" gutterBottom>
                                <FieldArray name="pricesByDate" component={NewByDate} classes={classes} validate={validatePriceByDate} />
                            </Typography>
                            <Divider />
                        </Grid>
                       
                    </Grid>
                </form>
                <ByQuestion boolQuestions={boolQuestions} />
                <Divider />
                <BySession sessions={sessions} />
            </div>
        )
    }
}

PricingForm = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {}
})(PricingForm);

const selector = formValueSelector('event')

PricingForm = connect(state => {
    const pricesByDate = selector(state, 'pricesByDate');
    const questions = selector(state, 'questions');
    const sessions = selector(state, 'sessions');
    const price = selector(state, 'price');
    const start = selector(state, 'start');

    return {
        pricesByDate,
        questions,
        sessions,
        price,
        start,
    }
})(PricingForm)

export default withStyles(styles)(PricingForm);