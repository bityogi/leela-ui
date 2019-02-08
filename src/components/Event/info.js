import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import InfoForm from './infoForm';

class Info extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.bigContainer}>
              <Paper className={classes.paper}>
                <div className={classes.topInfo}>
                  <div>
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                      Information
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      General information about this event
                    </Typography>
                  </div>
                  <div>
                  <Button variant="outlined" size="large" className={classes.outlinedButtom}>
                    Edit
                  </Button>
                  </div>
                </div>
                
                <InfoForm />
                  
                
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Info);