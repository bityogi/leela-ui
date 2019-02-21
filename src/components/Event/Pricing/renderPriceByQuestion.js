import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const setPriceForQuestion = (index, e) => {
    console.log('index of question: ', index);
    console.log('price of question: ', e.target.value);
}

let RenderPriceByQuestion = ({ question : { index, questionText } }) => {

    return (
        <form>
            <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        If Selected Yes, Add:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <label>{questionText}</label>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        <Field 
                            name={`priceForQuestion${index}`}
                            component={TextField} 
                            label="Add Price (if Yes)" 
                            onBlur={e => setPriceForQuestion(index, e)}
                        />
                    </Typography>
                </Grid>
            </form>
    )
}

RenderPriceByQuestion = reduxForm({
    form: 'priceByQuestion',
})(RenderPriceByQuestion)

export default RenderPriceByQuestion