import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'redux-form-material-ui';
import { filter } from 'lodash';
import Divider from '@material-ui/core/Divider';

import styles from 'styles';
import NewByDate from './byDate';
import ByQuestion from './byQuestion';
import BySession from './bySession';
import validate from 'components/Event/validate';


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
        const { handleSubmit, classes, sessions, questions } = this.props;

        console.log('sessions: ', sessions);
        const boolQuestions = filter(questions, q => { return q.type === 'YesNo' });
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
                                <FieldArray name="pricesByDate" component={NewByDate} classes={classes} />
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

    return {
        pricesByDate,
        questions,
        sessions,
    }
})(PricingForm)

export default withStyles(styles)(PricingForm);