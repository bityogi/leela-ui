import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import WeekDayItems from './weekdayItems';
import validate from 'components/Event/validate';

class WeekDaySelection extends Component {

    handleFormSubmit = () => {
        console.log('handle weekday form values');
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid container item xs={12}>
                
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Week Days
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Field name="weekDays" component={WeekDayItems} />
                    </Grid>
                </Grid>
            </form>
        )
    }
}

WeekDaySelection = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {},
})(WeekDaySelection)

export default withStyles(styles)(WeekDaySelection);