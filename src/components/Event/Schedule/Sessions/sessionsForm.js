import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


import styles from 'styles';
import NewSession from './session';
import validate from 'components/Event/validate';
import validateSession from './validateSession'


class SessionsForm extends Component {
   
    handleFormSubmit = (values) => {
        console.log('Form values for sessions: ', values);
    }

    render() {
        const { handleSubmit, classes } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid item container xs={12}>
                        <Typography variant="h4" gutterBottom>
                            <FieldArray name="sessions" component={NewSession} classes={classes} validate={validateSession} />
                        </Typography>
                    </Grid>
                </form>
            </div>
        )
    }

}

SessionsForm = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {}
})(SessionsForm)

const selector = formValueSelector('event')

SessionsForm = connect(state => {
    const sessions = selector(state, 'sessions');
    
    return {
        sessions,
    }
})(SessionsForm)

export default withStyles(styles)(SessionsForm);