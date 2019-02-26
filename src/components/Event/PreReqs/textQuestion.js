import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { TextField, Checkbox } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { isEmpty } from 'lodash';

import styles from 'styles';

const validate = (values, props) => {
    console.log('validaing textQuestion -- checking values: ', values);
    const errors = {}
    const { question: { type } } = props;

    console.log('validaing textQuestion -- question-TYPE: ', type);
    
    if (!values.questionText) {
        errors.questionText = 'Required'
    }

    if (type === 'SingleChoice' || type === 'MultipleChoice') {
        if (!values.choices) {
            errors.choices = 'No choices added'
        } else {
            if (values.choices.length <= 1) {
                errors.choices = 'At least two choices required';
            }
        }
        
        
    }

    console.log('errors for textQuestion validate: ', errors);
    return errors;
}

const validateChoice = (values, allValues, props) => {
    const errors = {};
    
    if (values) {
        if (!values.text) {
            errors.text = 'Required';
        }
    }
   
    const response = isEmpty(errors) ? null : errors;
    return response;
}   


const renderChoices = ({ fields, meta: { error, submitFailed }, classes }) => (
    <Grid item container xs={12}>
    
        {fields.map((choice, index) => (
            <Grid key={index}>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Choice #{index + 1}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name={`${choice}.text`}
                        type="text"
                        component={TextField}
                        label="Choice Text"
                    />
                    <Button 
                        variant="outlined" 
                        size="small" 
                        className={classes.inlineButton} 
                        onClick={() => fields.remove(index)}
                    >
                        Remove
                    </Button>
                </Grid>
            </Grid>
        ))}

        <Grid item xs={12}>
            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => fields.push({ index: fields.length })}>
                    Add Choice
                </Button>
                {submitFailed && error && <span>{error}</span>}
            </Typography>
        </Grid>
    </Grid>
)

class TextQuestion extends Component {

    handleFormSubmit = (values) => {
        const { onQuestionAdded, question, reset } = this.props;
        onQuestionAdded(values, question);
        reset();
    }

    render() {
        const { valid, question: { type }, classes, pristine, submitting, handleSubmit } = this.props;
        console.log('type of question: ', type);
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
                        color="primary"
                        disabled={ valid && (pristine || submitting) }
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

