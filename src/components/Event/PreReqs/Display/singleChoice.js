import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RadioGroup } from 'redux-form-material-ui';
import Radio from '@material-ui/core/Radio';
import { map } from 'lodash';

const renderChoices = (choices) => {
    return map(choices, c => {
        return <Radio value={c.index} label={c.text} />
    })
}

let SingleChoice = ({ question }) => {
    return (
        <div>
            <Field 
                name={`question-${question.index}`} 
                component={RadioGroup} 
                label={question.questionText} 
                hintText={question.questionText} 
            >
                {renderChoices(question.choices)}
            </Field>
        </div>
    )
}

SingleChoice = reduxForm({
    form: 'SingleChoiceQuestion',
})(SingleChoice)

export default SingleChoice;