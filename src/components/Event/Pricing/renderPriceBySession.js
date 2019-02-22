import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { toNumber } from 'lodash';

class RenderPriceBySession extends Component {

    setPriceForSession = (index, e) => {
        const { addPriceForSession } = this.props;
        const price = e.target.value;
        console.log('price is: ', price);
        if (toNumber(price)) {
            addPriceForSession(index, price);
        } else {
            console.log('price is not a number!');
        }
        
     }

    render() {
        const { session : { index, name } } = this.props;

        return (
            <form>
                <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Session-Price
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <label>{name}</label>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            <Field 
                                name={"price"}
                                component={TextField} 
                                label="Add Price (for session)" 
                                onBlur={e => this.setPriceForSession(index, e)}
                            />
                        </Typography>
                    </Grid>
                </form>
        )
    }
} 

RenderPriceBySession = reduxForm({
    
})(RenderPriceBySession)

export default RenderPriceBySession