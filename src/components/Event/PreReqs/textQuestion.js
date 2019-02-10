import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
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

class TextQuestion extends Component {

    handleFormSubmit = (values) => {
        const { onQuestionAdded } = this.props;
        onQuestionAdded(values);
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
                            name={`questionText}`}
                            style={{ width:'80%', fontSize: '.9em' }}
                        />
                        <Button 
                            type="submit"
                            variant="outlined" 
                            size="large" 
                            className={classes.inlineButton} 
                            disabled={ pristine || submitting }
                        >
                            Add
                        </Button>
                    </Typography>

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

