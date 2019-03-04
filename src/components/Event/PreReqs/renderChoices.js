import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from '@material-ui/core/Button';
import { isEmpty } from 'lodash';

export default ({ fields, meta: { error, submitFailed }, classes }) => {

    console.log('error in renderChoices: ', error);
    return (
        <Grid item container xs={12}>
    
            {fields.map((choice, index) => (
                <Grid key={index}>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Choice #{index + 1}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name={`${choice}.text`}
                            type="text"
                            component={TextField}
                            label="Choice Text"
                        />
                        <Button 
                            variant="outlined" 
                            size="small" 
                            className={classes.inlineButton} 
                            onClick={() => fields.remove(index)}
                        >
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            ))}

            <Grid item xs={12}>
                <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                    <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => fields.push({ index: fields.length })}
                        disabled={!isEmpty(error)}
                        >
                        Add Choice
                    </Button>
                    
                </Typography>
            </Grid>
        </Grid>
    )
}