import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { TextField, Checkbox } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { isEmpty, map } from 'lodash';

import styles from 'styles';
import renderChoices from './renderChoices';


const validate = (values, props) => {
    console.log('validaing textQuestion -- checking values: ', values);
    const errors = {}
    const { question: { type } } = props;

    if (!values.questionText) {
        errors.questionText = 'Question Text is Required'
    }

    if (type === 'SingleChoice' || type === 'MultipleChoice') {
        if (!values.choices) {
            errors.questionText = 'No choices added'
        } else {
            if (values.choices.length <= 1) {
                errors.questionText = 'At least two choices required';
            } else {
                map(values.choices, (c) => {
                    if (!c.text) {
                        errors.questionText = `No text in choice`
                    }
                })
            }
        }
    }

    console.log('errors for textQuestion validate: ', errors);
    return errors;
}

const validateChoice = (values, allValues, props) => {
    let errors = {};
    console.log('values for validateChoice: ', values);
    if (values) {
        map(values, (v) => {
            if (!v.text) {
                errors.text = `Text is missing for a choice`;
            }
        })
    }
   
    const response = isEmpty(errors) ? null : errors;
    console.log('validateChoice response: ', response);
    return response;
}   


class TextQuestion extends Component {

    handleFormSubmit = (values) => {
        const { onQuestionAdded, question, reset, valid } = this.props;
        console.log('is question form valid: ', valid);
        onQuestionAdded(values, question);
        reset();
    }

    render() {
        const { invalid, question: { type }, classes, pristine, submitting, handleSubmit, error } = this.props;
        console.error('error in TextQuestion: ', error);
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Question Text
                            <span>
                                { 
                                    type === 'YesNo' ? ' Yes / No'
                                    : type === 'SingleChoice' ? ' Single Choice' 
                                    : type === 'MultipleChoice' ? ' Multiple Choice' : '' }
                            </span>
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <Field 
                                component={TextField} 
                                name={`questionText`}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Is Required ?
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <Field 
                                component={Checkbox} 
                                name={`isRequired`}
                            />
                        </Typography>
                    </Grid>
                    
                    { 
                        (type === 'SingleChoice' || type === 'MultipleChoice') &&
                        (
                            <Typography variant="h6" gutterBottom>
                                <FieldArray name="choices" component={renderChoices} classes={classes} validate={validateChoice} />
                            </Typography>
                        )
                    }
                    { 
                        (type === 'YesNo') &&
                        (
                            <Grid item xs={12}>
                                <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                    Will the answer to this question affect pricing?
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <Field name="affectPrice" component={Checkbox} />
                                </Typography>
                            </Grid>
                        )
                    }
                    
                    <div className={classes.flexBar}>
                   
                      <Button
                        type="submit"
                        variant="contained"
                        color="default"
                        disabled={ (pristine || submitting) || invalid }
                        className={classes.outlinedButtom}
                      >
                        Add
                      </Button>
                       
                  </div>

                </Grid>
            </form>
            
        );
    }
}

TextQuestion = reduxForm({
    form: 'prereqsForm',
    validate,
})(TextQuestion)

export default withStyles(styles)(TextQuestion);

