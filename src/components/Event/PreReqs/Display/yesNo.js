import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Checkbox } from 'redux-form-material-ui';

let YesNoQuestion = ({ question }) => {
    return (
        <div>
            <Field 
                name={`question-${question.index}`} 
                component={Checkbox} 
                label={question.questionText} 
            />
        </div>
    )
}

YesNoQuestion = reduxForm({
    form: 'YesNoQuestion',
})(YesNoQuestion)

export default YesNoQuestion;