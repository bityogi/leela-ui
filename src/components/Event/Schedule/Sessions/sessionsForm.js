import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { isEmpty } from 'lodash';

import styles from 'styles';
import NewSession from './session';

const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    return errors;
}


class SessionsForm extends Component {
    state = {
        sessions : [],
        newSession: {},
    }

    handleFormSubmit = (values) => {
        console.log('Form values for sessions: ', values);
    }

    addNewSession = () => {
        const { reset } = this.props;
        const newSession = {
            index: this.state.sessions.length,
        }
        this.setState({ 
            newSession
        });
        reset();
    }

    oneSessionAdded = (values, session) => {
        console.log('Add this session please...', values);
        //Add the question to the questions array, and empty out the the newQuestion variable
        this.setState({
            newSession: {},
            sessions: [ ...this.state.sessions, { ...session, ...values } ]
        });
    }

    render() {
        const { handleSubmit, classes } = this.props;
        const { sessions, newSession } = this.state;
        console.log('sessions: ', sessions);
        return (
            <div>
                <div>
                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <Grid item container xs={12}>
                        
                            <Grid item xs={12}>
                                <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                    Add Session 
                                </Typography>
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    className={classes.inlineButton} 
                                    onClick={() => this.addNewSession()}>
                                    Add
                                </Button>
                            </Grid>
                            
                        </Grid>
                    </form>
                </div>
                
                <div>
                    { 
                        !isEmpty(newSession) && <NewSession onSessionAdded={this.oneSessionAdded} session={newSession} />
                    }
                </div>

            </div>
            
        )
    }

}

SessionsForm = reduxForm({
    form: 'sessionsForm',
    validate,
    warn: () => {}
})(SessionsForm)

export default withStyles(styles)(SessionsForm);