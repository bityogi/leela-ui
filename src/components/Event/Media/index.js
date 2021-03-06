import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import MediaForm from './mediaForm';

class Media extends Component {

    render() {
        const { classes, enableSubmission, isSubmissionEnabled } = this.props;
        return (
            <div className={classes.bigContainer}>
            <Paper className={classes.paper}>
              <div className={classes.topInfo}>
                <div>
                  <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                    Event Media
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Add any images you would like associated with this event
                  </Typography>
                </div>
                
              </div>
              
              <MediaForm enableSubmission={enableSubmission} isSubmissionEnabled={isSubmissionEnabled}  />
                
              
            </Paper>
          </div>
        )
    }
}

export default withStyles(styles)(Media);