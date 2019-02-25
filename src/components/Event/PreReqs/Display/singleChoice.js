import React from 'react';
import { reduxForm } from 'redux-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { map } from 'lodash';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const renderChoices = (choices) => {
    return map(choices, c => {
        console.log('rendering choice: ', c);
        return (
            <FormControlLabel value={c.text} control={<Radio />} label={c.text} key={c.index} />
        )
         
    })
}

let SingleChoice = ({ question }) => {
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">{question.questionText}</FormLabel>
                <RadioGroup
                    aria-label={question.questionText}
                    name={`question-${question.index}`}
                    value={null}
                >
                    {renderChoices(question.choices)}
                </RadioGroup>
            </FormControl>
            <Divider />
        </div>
    )
}

SingleChoice = reduxForm({
    form: 'SingleChoiceQuestion',
})(SingleChoice)

export default SingleChoice;