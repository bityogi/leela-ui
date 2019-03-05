import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'redux-form-material-ui';
import { filter, isEmpty, map } from 'lodash';
import Divider from '@material-ui/core/Divider';

import styles from 'styles';
import NewByDate from './byDate';
import ByQuestion from './byQuestion';
import BySession from './bySession';
import validate from 'components/Event/validate';

const validateByDate = (values, allValues, props) => {
    let errors = {};
    console.log('values for validateByDate: ', values);
    if (values && values.length > 0) {
        map(values, v => {
            if (!v.from) {
                errors.from = 'Required'
            }
    
            if (!v.till) {
                errors.till = 'Required'
            }
    
            if (!v.price) {
                errors.price = 'Required'
            }
        })
        
    }
   
    const response = isEmpty(errors) ? null : errors;
    console.log('validateByDate response: ', response);
    return response;


}
class PricingForm extends Component {

    // state = {
    //     newByDate: {},
    //     byDates: [],
    // }

    handleFormSubmit = (values) => {
        console.log('schedule form values: ', values);
    }

    componentDidUpdate(prevProps) {
        const { valid, submitting, anyTouched, enableSubmission } = this.props;
        const enabled = (valid && !submitting) || !anyTouched;
        const wasEnabled = (prevProps.valid && !prevProps.submitting) || !prevProps.anyTouched

        if (enabled !== wasEnabled) {
            enableSubmission(enabled);
        }
    }

 
    render() {
        const { handleSubmit, classes, sessions, questions } = this.props;

        console.log('sessions: ', sessions);
        console.log('questions: ', questions);
        const boolQuestions = filter(questions, q => { return q.type === 'YesNo' && q.affectPrice === true });
        return (
            <div>
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
                                />
                            </Typography>
                            <Divider />
                        </Grid>
                       
                        <Grid>
                            <Typography variant="h4" gutterBottom>
                                <FieldArray name="pricesByDate" component={NewByDate} classes={classes} validate={validateByDate} />
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
    const start = selector(state, 'start');
    const end = selector(state, 'end');
    
    return {
        pricesByDate,
        questions,
        sessions,
        start,
        end,
    }
})(PricingForm)

export default withStyles(styles)(PricingForm);