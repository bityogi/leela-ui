import React from 'react';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { isEmpty } from 'lodash';

import DatePicker from 'components/common/datePicker';
import RenderErrors from 'components/common/renderValues';


export default ({ fields, meta: { error, submitFailed }, classes }) => (
    <Grid item container xs={12}>
    
        {fields.map((byDate, index) => (
            <Grid key={index}>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        From Date
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        <Field 
                            component={DatePicker} 
                            name={`${byDate}.from`}
                        />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        By Date
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Field 
                            component={DatePicker} 
                            name={`${byDate}.till`}
                        />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Price
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Field 
                            component={TextField} 
                            name={`${byDate}.price`}
                            type="number"
                            parse={value => Number(value)}
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
                    disabled={!isEmpty(error)}
                >
                    Add Price By Date
                </Button>
                
            </Typography>
            {
                !isEmpty(error) && <RenderErrors renderObject={error} isError/>
            }
        </Grid>
    </Grid>
)

