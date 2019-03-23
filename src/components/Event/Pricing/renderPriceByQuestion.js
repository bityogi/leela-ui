import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { toNumber } from 'lodash';

class RenderPriceByQuestion extends Component {

    setPriceForQuestion = (index, e) => {
        const { addPriceForQuestion } = this.props;
        const price = e.target.value;
        console.log('price is: ', price);
        if (toNumber(price)) {
            addPriceForQuestion(index, price);
        } else {
            console.log('price is not a number!');
        }
        
     }

    render() {
        const { question : { index, text } } = this.props;

        return (
            <form>
                <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            If Selected Yes, Add:
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <label>{text}</label>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            <Field 
                                name={"price"}
                                component={TextField} 
                                label="Add Price (if Yes)" 
                                onBlur={e => this.setPriceForQuestion(index, e)}
                            />
                        </Typography>
                    </Grid>
                </form>
        )
    }
} 

RenderPriceByQuestion = reduxForm({
    
})(RenderPriceByQuestion)

export default RenderPriceByQuestion