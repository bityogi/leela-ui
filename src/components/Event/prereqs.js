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

import styles from './styles';

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
                  <div style={{marginBottom: 32}}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                      Are you a human?
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Yes
                    </Typography>
                  </div>
                  <div>
                    <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                      Would you like to take this class?
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Yes
                    </Typography>
                  </div>
                </div>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(PreReqs);