import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Checkbox, FormControlLabel } from 'redux-form-material-ui';
import { map } from 'lodash';

const renderChoices = (choices) => {
    return map(choices, c => {
        return <FormControlLabel control={<Field name={`choice-${c.index}`} component={Checkbox} />} label={c.text} />
    })
}

let MultiChoiceQuestion = ({ question }) => {
    return (
        <div>
            <label>{question.questionText}</label>
            {renderChoices(question.choices)}
        </div>
    )
}

MultiChoiceQuestion = reduxForm({
    form: 'MultiChoiceQuestion',
})(MultiChoiceQuestion)

export default MultiChoiceQuestion;