import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import IntervalTimes from './intervalItems';
import validate from 'components/Event/validate';

class Interval extends Component {

    
    handleFormSubmit = (values) => {
        console.log('interval form values: ', values);
    }

    render() {
        const { handleSubmit, recurrenceType } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid container item xs={12}>
                
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Interval
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Field name="interval" component={IntervalTimes} recurrenceType={recurrenceType} />
                    </Grid>
                </Grid>
            </form>
            
        )
    }
}

Interval = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {}
})(Interval)

export default withStyles(styles)(Interval);