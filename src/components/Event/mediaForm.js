import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import { isEmpty } from 'lodash';
// import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import withStyles from '@material-ui/core/styles/withStyles';


import styles from 'styles';
import FileUpload from 'components/common/FileUpload';

const imageIsRequired = value => (isEmpty(value) ? "Required" : undefined);


const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    return errors;
}

class MediaForm extends Component {
    state = {
        imageFile: [],
    }

    handleFormSubmit = (values) => {
        console.log('Form values for event info: ', values);
    }

    handleFileUpload (file) {
        console.log('received file: ', file);
    }

    handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

    render() {
        const { classes, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item container xs={12}>
                
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Event Image
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <FileUpload />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Profile Image
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="title" component={TextField}  />
                        </Typography>
                    </Grid>
                  
                    

                </Grid>

            </form>
        )
    }

}

MediaForm = reduxForm({
    form: 'eventInfo',
    validate,
    warn: () => {}
})(MediaForm)

export default withStyles(styles)(MediaForm);