import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import styles from 'styles';
import DatePicker from 'components/common/datePicker';
import validate from 'components/Event/validate';

class RepeatUntil extends Component {

    handleFormSubmit = (values) => {
        console.log('repeat until form values: ', values);
    }

    render() {
        const { handleSubmit } = this.props;
       
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid container item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            <Field name="repeatUntil" component={DatePicker} label="Repeat Until" fullWidth />
                        </Typography>
                    </Grid>
                </form>
            </div>
        )
    }
}

RepeatUntil = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {}
})(RepeatUntil);

export default withStyles(styles)(RepeatUntil);