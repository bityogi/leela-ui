import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import FileUpload from 'components/common/FileUpload';
import validate from '../validate';

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

    componentDidUpdate(prevProps) {
        const { valid, submitting, anyTouched, enableSubmission } = this.props;
        console.log('mediaForm -- valid: ', valid);
        const enabled = (valid && !submitting);
        const wasEnabled = (prevProps.valid && !prevProps.submitting);

        console.log('mediaForm -- enabled: ', enabled);
        console.log('mediaForm -- wasEnabled: ', wasEnabled);
        
        if (enabled !== wasEnabled) {
            enableSubmission(enabled);
        }
    }

    handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item container xs={12}>
                
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Event Image
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="eventImage" component={FileUpload} />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Alternate Image
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <Field name="altImage" component={FileUpload} />
                        </Typography>
                    </Grid>

                </Grid>

            </form>
        )
    }

}

MediaForm = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {}
})(MediaForm)

export default withStyles(styles)(MediaForm);