import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
// import PreReqsForm from './prereqsForm';

class Pricing extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.smallContainer}>
              <Paper className={classes.paper}>
                <div>
                  <div style={{marginBottom: 32}}>
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                      Pricing
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Set up the pricing for this event
                    </Typography>
                  </div>
                  
                  
                </div>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Pricing);