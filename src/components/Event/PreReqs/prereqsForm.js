import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { isEmpty } from 'lodash';

import styles from 'styles';
import TextQuestion from './textQuestion';

const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    return errors;
}

// const QuestionTypes = ({fields, meta: { error} }) => (
//     <Typography variant="h5" gutterBottom>
//         <Field 
//             component={Select} 
//             name="questionType"
//             style={{ width:'80%', fontSize: '.9em' }}
//         >
//             <MenuItem key={'YesNo'} value={'YesNo'}>Yes or No</MenuItem>
//             <MenuItem key={'SingleChoice'} value={'SingleChoice'}>Single Choice</MenuItem>
//             <MenuItem key={'MultipleChoice'} value={'MultipleChoice'}>Multiple Choice</MenuItem>
//             <MenuItem key={'Text'} value={'Text'}>Text</MenuItem>
//         </Field>
//         <Button 
//             variant="outlined" 
//             size="large" 
//             className={classes.inlineButton} 
//             disabled={ isEmpty(questionType) ? true : false }
//             onClick={() => this.addFieldsArray()}>
//             Add
//         </Button>
//     </Typography>
// );

class PreReqsForm extends Component {
    state = {
        questions : [],
        newQuestion: {},
    }

    handleFormSubmit = (values) => {
        console.log('Form values for pre-reqs: ', values);
    }

    addNewQuestion = () => {
        const { questionType, reset } = this.props;
        const newQuestion = {
            index: this.state.questions.length - 1,
            type: questionType
        }
        this.setState({ 
            newQuestion
        });
        reset();
    }

    onQuestionAdded = (values) => {
        console.log('Add this question please...', values);
    }

    render() {
        const { handleSubmit, classes, questionType } = this.props;
        const { questions, newQuestion } = this.state;
        console.log('new question: ', newQuestion);
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
                            <Grid item xs={12}>
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
                                        <Button 
                                            variant="outlined" 
                                            size="large" 
                                            className={classes.inlineButton} 
                                            disabled={ isEmpty(questionType) ? true : false }
                                            onClick={() => this.addNewQuestion()}>
                                            Add
                                        </Button>
                                    </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                
                <div>
                    { 
                        !isEmpty(newQuestion) ? 
                            <TextQuestion onQuestionAdded={this.onQuestionAdded} question={newQuestion} /> 
                            : null 
                    }
                </div>

            </div>
            
        )
    }

}

PreReqsForm = reduxForm({
    form: 'prereqsForm',
    validate,
    warn: () => {}
})(PreReqsForm)

const selector = formValueSelector('prereqsForm')

PreReqsForm  = connect(state => {
    const questionType  = selector(state, 'questionType');
    return {
        questionType
    }
})(PreReqsForm)
export default withStyles(styles)(PreReqsForm);