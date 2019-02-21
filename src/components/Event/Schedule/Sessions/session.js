import React from 'react';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import DateTimePicker from 'components/common/dateTimePicker';


export default ({ fields, meta: { error, submitFailed }, classes }) => (
    <Grid item container xs={12}>
    
        {fields.map((session, index) => (
             <Grid key={index}>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Session Name
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <Field 
                            component={TextField} 
                            name={`${session}.name`}
                            style={{ width:'80%', fontSize: '.9em' }}
                        />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Start Date
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <Field 
                            component={DateTimePicker} 
                            name={`${session}.start`}
                            style={{ width:'80%', fontSize: '.9em' }}
                        />
                    </Typography>
                </Grid>
            
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        End Date
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <Field 
                            component={DateTimePicker} 
                            name={`${session}.end`}
                            style={{ width:'80%', fontSize: '.9em' }}
                        />
                    </Typography>
                </Grid>

                <Grid item xs={12}>
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
                    onClick={() => fields.push({ index: fields.length })}>
                    Add Session
                </Button>
                {submitFailed && error && <span>{error}</span>}
            </Typography>
        </Grid>
    </Grid>
)



