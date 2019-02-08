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

class Schedule extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <div>
                        <div style={{marginBottom: 32}}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Schedule
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Set your event schedule
                          </Typography>
                        </div>
                        <div style={{marginBottom: 32}}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Event
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            Event Title
                          </Typography>
                        </div>
                        <div>
                          <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                            Event Type
                          </Typography>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                              value={this.state.receivingAccount}
                              onChange={this.handleChange}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="receivingAccount"
                                />
                              }
                            >
                              <MenuItem value="">
                                <em></em>
                              </MenuItem>
                              <MenuItem value={'0297 00988200918'}>First account</MenuItem>
                              <MenuItem value={'0235 00235233332'}>Second account</MenuItem>
                              <MenuItem value={'1256 00864222212'}>Third account</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </Paper>
                    </div>
        );
    }
}

export default withStyles(styles)(Schedule);