import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { isEmpty } from 'lodash';

import styles from 'styles';
import store from 'store';
import TextQuestion from './textQuestion';
import validate from 'components/Event/validate';
import { Divider } from '@material-ui/core';

class PreReqsForm extends Component {
    state = {
        newQuestion: {},
    }

    handleFormSubmit = (values) => {
        console.log('Form values for pre-reqs: ', values);
    }

    addNewQuestion = () => {
        const { questions, questionType } = this.props;
        const newQuestion = {
            index: questions.length,
            type: questionType
        }
        this.setState({ 
            newQuestion
        });
        store.dispatch(change('event', 'questionType', null));
    }

    clearNewQuestion = () => {
        this.setState({ newQuestion : {} });
        store.dispatch(change('event', 'questionType', null));
    }

    onQuestionAdded = (values, question) => {
        console.log('Add this question please...', values);
        const { questions } = this.props;
        console.log('questions -- onQuestionAdded: ', questions);
        //Add the question to the questions array, and empty out the the newQuestion variable
        this.setState({
            newQuestion: {},
        });

        const newSetOfQuestions = [ ...questions, { ...question, ...values }];

        store.dispatch(change('event', 'questions', newSetOfQuestions));
    }

    componentDidUpdate(prevProps) {
        const { enableSubmission, questionType } = this.props;
        const { newQuestion } = this.state;
        // console.log('prereqsForm -- componentDidUpdate: newQuestion - ', newQuestion);
        // console.log('prereqsForm -- componentDidUpdate: questionType - ', questionType);
        
        const isValid = () => {
            return (isEmpty(questionType) && isEmpty(newQuestion))
        }
        // console.log('prereqsForm -- componentDidUpdate: isValid - ', isValid());
        
        let enabled = (isValid());
        
        enableSubmission(enabled);
    }

    render() {
        const { handleSubmit, classes, questionType } = this.props;
        const { newQuestion } = this.state;
        return (
            <div>
                <div>
                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <Grid item container xs={12}>
                        
                            <Grid item xs={12}>
                                <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                    Type of of question
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h5" gutterBottom>
                                        <Field 
                                            component={Select} 
                                            name="questionType"
                                            style={{ width:'80%', fontSize: '.9em' }}
                                        >
                                            <MenuItem key={'YesNo'} value={'YesNo'}>Yes or No</MenuItem>
                                            <MenuItem key={'SingleChoice'} value={'SingleChoice'}>Single Choice</MenuItem>
                                            <MenuItem key={'MultipleChoice'} value={'MultipleChoice'}>Multiple Choice</MenuItem>
                                            <MenuItem key={'Text'} value={'Text'}>Text</MenuItem>
                                        </Field>
                                    </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    size="small" 
                                    className={classes.inlineButton} 
                                    disabled={ isEmpty(questionType) ? true : false }
                                    onClick={() => this.addNewQuestion()}>
                                    Add
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button 
                                    variant="outlined" 
                                    color="default"
                                    size="small" 
                                    className={classes.inlineButton} 
                                    disabled={ isEmpty(questionType) ? true : false }
                                    onClick={() => this.clearNewQuestion()}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Divider className={classes.divider} />
                <div>
                    { 
                        !isEmpty(newQuestion) ? 
                            <TextQuestion question={newQuestion} onQuestionAdded={this.onQuestionAdded} />
                            : null 
                    }
                </div>

            </div>
            
        )
    }

}

PreReqsForm = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, 
    initialValues: { questions: [] },
    validate,
    warn: () => {}
})(PreReqsForm)

const selector = formValueSelector('event')

PreReqsForm  = connect(state => {
    const questionType  = selector(state, 'questionType');
    //const questions = selector(state, 'questions');
    return {
        questionType,
    }
})(PreReqsForm)
export default withStyles(styles)(PreReqsForm);