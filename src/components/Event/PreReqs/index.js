import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import PreReqsForm from './prereqsForm';

class PreReqs extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.smallContainer}>
              <Paper className={classes.paper}>
                <div>
                  <div style={{marginBottom: 32}}>
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                      Pre Requisites
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Set up any pre-requisites you may require for this event registration
                    </Typography>
                  </div>
                  
                  <PreReqsForm />
                </div>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(PreReqs);