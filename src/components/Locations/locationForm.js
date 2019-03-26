import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';
import { LOCATION_TYPE } from 'util/enums';
import styles from 'styles';
import validateLocation from './validateLocation';


class LocationForm extends Component {

    handleFormSubmit = (values) => {
        console.log('Form values for event info: ', values);
    }

    render() {
        const { handleSubmit, locationType } = this.props;
        console.log('locationType: ', locationType)
        console.log('Physical locationType value: ', LOCATION_TYPE.Physical)

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item container xs={12}>
                
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Name
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="name" component={TextField}  />
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Location
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field
                                style={{ width:'80%', fontSize: '.9em' }}
                                name="locationType"
                                component={Select}
                                autoWidth={true}
                                >
                                <MenuItem key={0} value={LOCATION_TYPE.Physical.ordinal}>Physical</MenuItem>
                                <MenuItem key={1} value={LOCATION_TYPE.Online.ordinal}>Online</MenuItem>
                            
                            </Field>
                           
                        </Typography>
                    </Grid>

                    {
                        (locationType === LOCATION_TYPE.Physical.ordinal) && (
                            <Grid>
                                <Grid item xs={12}>
                                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                        Address1
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        <Field name="address1" component={TextField}  />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                        Address1
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        <Field name="address1" component={TextField}  />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                        Address2
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        <Field name="address2" component={TextField}  />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                        City
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        <Field name="city" component={TextField}  />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                        State
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        <Field
                                            style={{ width:'80%', fontSize: '.9em' }}
                                            name="location"
                                            component={Select}
                                            autoWidth={true}
                                            >
                                            <MenuItem key={'CA'} value={1}>CA</MenuItem>
                                            <MenuItem key={'NC'} value={2}>NC</MenuItem>
                                        
                                        </Field>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                        Zipcode
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        <Field name="zipcode" component={TextField}  />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                        Country
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        <Field name="country" component={TextField}  />
                                    </Typography>
                                </Grid>
                            </Grid>
                        )
                    }

                    {
                        locationType === LOCATION_TYPE.Online.ordinal && (
                            <Grid item xs={12}>
                                <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                    URL
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    <Field name="url" component={TextField}  />
                                </Typography>
                            </Grid>
                        )
                    }

                    
                </Grid>

            </form>
        )
    }

}

LocationForm = reduxForm({
    form: 'location',
    validate: validateLocation,
    
})(LocationForm)

const selector = formValueSelector('location')

LocationForm = connect(state => {
    const locationType = selector(state, 'locationType');
    
    return {
        locationType,
    }
})(LocationForm)

export default withStyles(styles)(LocationForm);