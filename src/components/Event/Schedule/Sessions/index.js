import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import SessionsForm from './sessionsForm';

class Sessions extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.smallContainer}>
              <Paper className={classes.paper}>
                <div>
                  <div style={{marginBottom: 32}}>
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                      Multiple Sessions
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Create multiple sessions within your event to allow for customized registration and pricing based on sessions.
                    </Typography>
                  </div>
                  
                  <SessionsForm />
                </div>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Sessions);