import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


import styles from 'styles';
import MonthDaySelectionTabs from './monthdaySelectionTabs';
import DayOfWeek from './dayOfWeek';
import MonthDays from './monthDays';
import validate from 'components/Event/validate';

class MonthDaySelection extends Component {

    handleFormSubmit = () => {
        console.log('handle weekday form values');
    }

    render() {
        const { handleSubmit, monthDaySelectionType } = this.props;
        console.log('MONTHDAYSELECTION_TYPE: ', monthDaySelectionType);
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid container item xs={12}>
                
                    <Grid item xs={12}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Month Days
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Field name="monthDaySelectionType" component={MonthDaySelectionTabs} />
                    </Grid>
                    <Grid item xs={12}>
                    { 
                        monthDaySelectionType === 0 && 
                        <Field name="daysOfMonth" component={MonthDays} /> 
                    }
                    { monthDaySelectionType === 1 && <DayOfWeek /> }
                    </Grid>
                    
                </Grid>
            </form>
        )
    }
}

MonthDaySelection = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    validate,
    warn: () => {},
})(MonthDaySelection)

const selector = formValueSelector('event')

MonthDaySelection = connect(state => {
    const monthDaySelectionType = selector(state, 'monthDaySelectionType');
    return {
        monthDaySelectionType
    }
})(MonthDaySelection)

export default withStyles(styles)(MonthDaySelection);