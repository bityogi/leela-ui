import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import styles from './styles';
import infoForm from './infoForm';

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
                      <Grid item container xs={12}>
                      <form>
                      <Grid item xs={6}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            User
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            <Field name="title" component={TextField}  />
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            City
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            Tokyo
                          </Typography>
                        </Grid>

                      </form>
                        
                      </Grid>
                    </Paper>
                    </div>
        );
    }
}

Info = reduxForm({
  form: infoForm,
  
})(Info);

export default withStyles(styles)(Info);