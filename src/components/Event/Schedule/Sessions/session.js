import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import DatePicker from 'components/common/datePicker';
import TimePicker from 'components/common/timePicker';

const validate = values => {
    const errors = {}

    if (!values.sessionName) {
        errors.sessionName = 'Required'
    }

    return errors;
}


class Session extends Component {

    handleFormSubmit = (values) => {
        const { onSessionAdded, session } = this.props;
        onSessionAdded(values, session);
    }

    render() {
        const {  classes, pristine, submitting, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Session Name
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            <Field 
                                component={TextField} 
                                name={`sessionName`}
                                style={{ width:'80%', fontSize: '.9em' }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Start Date
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            <Field 
                                component={DatePicker} 
                                name={`sessionStartDate`}
                                style={{ width:'80%', fontSize: '.9em' }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Start Time
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            <Field 
                                component={TimePicker} 
                                name={`sessionStartTime`}
                                style={{ width:'80%', fontSize: '.9em' }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            End Date
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            <Field 
                                component={DatePicker} 
                                name={`sessionEndDate`}
                                style={{ width:'80%', fontSize: '.9em' }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            End Time
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            <Field 
                                component={TimePicker} 
                                name={`sessionEndTime`}
                                style={{ width:'80%', fontSize: '.9em' }}
                            />
                        </Typography>
                    </Grid>
                    
                    
                    
                    <div className={classes.flexBar}>
                   
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={ pristine || submitting }
                      >
                        Add
                      </Button>
                    
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.backButton}
                            disabled={ pristine || submitting }
                        >
                         Clear
                        </Button>
                  </div>

                </Grid>
            </form>
            
        );
    }
}

Session = reduxForm({
    form: 'sessionForm',
    validate,
})(Session)

export default withStyles(styles)(Session);

