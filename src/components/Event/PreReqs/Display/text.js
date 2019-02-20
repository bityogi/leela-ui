import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

let TextQuestion = ({ question }) => {
    console.log(' Displaying TEXT question: ', question);
    return (
        <div>
            <Field name={`question-${question.index}`} component={TextField} label={question.questionText} />
        </div>
    )
}

TextQuestion = reduxForm({
    form: 'textQuestion',
}) (TextQuestion)

export default TextQuestion;