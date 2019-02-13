import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import { history } from 'store';

const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    return errors;
}

class InfoForm extends Component {

    handleFormSubmit = (values) => {
        console.log('Form values for event info: ', values);
    }

    componentDidUpdate(prevProps) {
        const { valid, submitting, anyTouched, enableSubmission } = this.props;
        const enabled = (valid && !submitting) || !anyTouched;
        const wasEnabled = (prevProps.valid && !prevProps.submitting) || !prevProps.anyTouched

        if (enabled !== wasEnabled) {
            enableSubmission(enabled);
        }
    }

    render() {
        const { classes, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item container xs={12}>
                
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Title
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="title" component={TextField}  />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Location
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field
                                style={{ width:'80%', fontSize: '.9em' }}
                                name="location"
                                component={Select}
                                autoWidth={true}
                                >
                                <MenuItem key={'Location 1'} value={1}>Location 1</MenuItem>
                                <MenuItem key={'Location 2'} value={2}>Location 2</MenuItem>
                            
                            </Field>
                            <Button variant="outlined" size="large" className={classes.inlineButton} onClick={() => history.push('/location')}>
                                Add
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Description
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            <Field name="description" component={TextField} rows="4" multiline className={classes.multiLineField}  />
                        </Typography>
                    </Grid>

                </Grid>

            </form>
        )
    }

}

InfoForm = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    warn: () => {},
    
})(InfoForm)

export default withStyles(styles)(InfoForm);