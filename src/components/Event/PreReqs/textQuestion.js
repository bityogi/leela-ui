import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';

const validate = values => {
    const errors = {}

    if (!values.questionText) {
        errors.questionText = 'Required'
    }

    return errors;
}
const renderChoices = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>
                Add Choice
            </button>
            {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((choice, index) => (
            <li key={index}>
                <button
                    type="button"
                    title="Remove Choice"
                    onClick={() => fields.remove(index)}
                >Remove</button>
                <h4>Choice #{index + 1}</h4>
                <Field
                    name={`${choice}.text`}
                    type="text"
                    component={TextField}
                    label="Choice Text"
                />
            </li>
        ))}
    </ul>
)
class TextQuestion extends Component {

    handleFormSubmit = (values) => {
        const { onQuestionAdded, question } = this.props;
        onQuestionAdded(values, question);
    }

    render() {
        const { question: { type, index }, classes, pristine, submitting, handleSubmit } = this.props;

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
                    </Grid>
                    <Typography variant="h3" gutterBottom>
                        <Field 
                            component={TextField} 
                            name={`questionText`}
                            style={{ width:'80%', fontSize: '.9em' }}
                        />
                    </Typography>
                    { 
                        type === 'SingleChoice' || type === 'MultipleChoice' ? 
                        (
                            <Typography variant="h4" gutterBottom>
                                <FieldArray name="choices" component={renderChoices} />
                            </Typography>
                        )
                        : null }
                    
                    <div className={classes.flexBar}>
                   
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={ pristine || submitting }
                      >
                        Add
                      </Button>
                    
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.backButton}
                            disabled={ pristine || submitting }
                        >
                         Clear
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

