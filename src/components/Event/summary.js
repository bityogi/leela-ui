import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';

class Schedule extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.smallContainer}>
              <Paper className={classes.paper}>
                <div>
                  <div style={{marginBottom: 32}}>
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                      Event Summary
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Please review event details
                    </Typography>
                  </div>
                  <div style={{marginBottom: 32}}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                      Start Date
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      1/1/2019
                    </Typography>
                  </div>
                  <div>
                    <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                      End Date
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      1/1/2019
                    </Typography>
                  </div>
                </div>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Schedule);