import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


import styles from 'styles';
import MonthDaySelectionTabs from './monthdaySelectionTabs';
import DayOfWeek from './dayOfWeek';

class MonthDaySelection extends Component {

    handleFormSubmit = () => {
        console.log('handle weekday form values');
    }

    render() {
        const { handleSubmit, monthDaySelectionType } = this.props;
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
                    { monthDaySelectionType === 0 && <div>Working on it</div> }
                    { monthDaySelectionType === 1 && <DayOfWeek /> }
                </Grid>
            </form>
        )
    }
}

MonthDaySelection = reduxForm({
    form: 'monthDaySelection',
    initialValues: { monthDaySelectionType: 0 },
    validate: () => {},
    warn: () => {},
})(MonthDaySelection)

const selector = formValueSelector('monthDaySelection')

MonthDaySelection = connect(state => {
    const monthDaySelectionType = selector(state, 'monthDaySelectionType');
    return {
        monthDaySelectionType
    }
})(MonthDaySelection)

export default withStyles(styles)(MonthDaySelection);