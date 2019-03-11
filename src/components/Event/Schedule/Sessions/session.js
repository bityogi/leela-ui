import React from 'react';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateTimePicker from 'components/common/dateTimePicker';
import { isEmpty, map } from 'lodash';

import RenderErrors from 'components/common/renderValues';

export default (props) => {

    const { fields, meta: { error, valid }, classes, start } = props;
    const hasErrorMessages = (!isEmpty(error) && !isEmpty(error.messages));
    console.log('session start -- initialValue: ', start);
    return (
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
                                error={(!isEmpty(error) && !isEmpty(error.name))}
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
                                initialFocusedDate={start}
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
                                initialFocusedDate={start}
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
                        onClick={() => fields.push({ index: fields.length })}
                        disabled={!valid}
                    >
                        Add Session
                    </Button>
                    
                </Typography>
            </Grid>
            {
                !isEmpty(error) && <RenderErrors renderObject={error} isError/>
            }
        </Grid>
    )
}
    



