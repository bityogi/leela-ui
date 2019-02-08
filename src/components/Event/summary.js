import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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