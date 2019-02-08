import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';


// import withStyles from '@material-ui/core/styles/withStyles';

// import styles from './styles';

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

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item container xs={12}>
                
                    <Grid item xs={6}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Title
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="title" component={TextField}  />
                        </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Location
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field
                                    style={{ width:'80%', fontSize: '.9em' }}
                                    name="location"
                                    component={Select}
                                    hintText="Type"
                                    autoWidth={true}
                                    iconStyle={{ padding: 0, margin: 0, border: '2px', width: '15px' }}
                                    >
                                    <MenuItem key={'Location 1'} value={1}>Location 1</MenuItem>
                                    <MenuItem key={'Location 2'} value={2}>Location 2</MenuItem>
                                
                                </Field>
                            </Typography>
                        </Grid>

                    </Grid>

                      </form>
        )
    }

}

InfoForm = reduxForm({
    form: 'eventInfo',
    validate,
    warn: () => {}
})(InfoForm)

export default InfoForm;