import React from 'react';
import { reduxForm } from 'redux-form';
import { map } from 'lodash';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const renderChoices = (choices) => {
    return map(choices, c => {
        return (
            <FormControlLabel control={<Checkbox value={`c.index`} />} label={c.text} key={c.index} />
        )
        
    })
}

let MultiChoiceQuestion = ({ question }) => {
    return (
        <div>
            <label>{question.text}</label>
            {renderChoices(question.choices)}
        </div>
    )
}

MultiChoiceQuestion = reduxForm({
    form: 'MultiChoiceQuestion',
})(MultiChoiceQuestion)

export default MultiChoiceQuestion;