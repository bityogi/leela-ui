import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import MediaForm from './mediaForm';

class Media extends Component {

    render() {
        const { classes } = this.props;
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
                <div>
                <Button variant="outlined" size="large" className={classes.outlinedButtom}>
                  Edit
                </Button>
                </div>
              </div>
              
              <MediaForm />
                
              
            </Paper>
          </div>
        )
    }
}

export default withStyles(styles)(Media);