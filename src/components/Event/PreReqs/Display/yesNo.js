import React from 'react';
import { reduxForm } from 'redux-form';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'


let YesNoQuestion = ({ question : { index, questionText } }) => {
    return (
        <div>
            <FormControlLabel control={<Checkbox value={`question-${index}`} />} label={questionText} />
        </div>
    )
}

YesNoQuestion = reduxForm({
    form: 'YesNoQuestion',
})(YesNoQuestion)

export default YesNoQuestion;