import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from 'styles';
import WeekDayItems from './weekdayItems';

const MonthDaySelectionType = ({ input : { value, onChange }}) => {
    console.log('MonthDaySelection value: ', value);
    return (
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={(v) => onChange(v)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="By Month Days" />
                <Tab label="By Days of Month" />
            </Tabs>
        </AppBar>
    )
}
    


class MonthDaySelection extends Component {

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
                            Month Days
                        </Typography>
                        
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Field name="monthDaySelectionType" component={MonthDaySelectionType} />
                    </Grid>
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

export default withStyles(styles)(MonthDaySelection);