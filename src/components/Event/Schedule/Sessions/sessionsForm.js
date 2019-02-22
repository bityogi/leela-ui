import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { map, isEmpty } from 'lodash';
import { isAfter, isBefore } from 'date-fns';

import styles from 'styles';
import NewSession from './session';
import validate from 'components/Event/validate';


const validateSession = (sessions, allValues, props) => {
    console.log('validateSession -- value: ', sessions);
    console.log('validateSession -- allValues: ', allValues);
    const errors = {};
    const messages = [];

    if (sessions) {
        map(sessions, (session) => {
            console.log('Session values are : ', session);
            if (!session.name) {
                errors.name = 'Required'
            }

            if (!session.start) {
                errors.start = 'Required'
            }

            if (!session.end) {
                errors.end = 'Required'
            }

            if (session.start && session.end) {
                if (isAfter(session.start, session.end)) {
                    messages.push('Session start date should be before session end-date');
                } else {
                    if (isBefore(session.start, allValues.start)) {
                        messages.push('A session start time cannot be before Event start time');    
                    }
                    if (isAfter(session.end, allValues.end)) {
                        messages.push('A session end time cannot be after Event end time');
                    }
                }
            }
        })
    }

    if (!isEmpty(messages)) {
        errors.messages = messages;
    }

    const response = isEmpty(errors) ? null : errors;

    console.log('response from validateSession: ', response);
    return response;
}

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