import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Field, reduxForm } from 'redux-form';
import { Select } from 'redux-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';

class DayOfWeek extends Component {

    render() {
        return (
            <Grid container item xs={12}>
                <Grid item xs={6}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Number
                    </Typography>
                    <Field name="dayOfWeek_number" label="Number" component={Select}>
                        <MenuItem key={1} value={1}>First</MenuItem>
                        <MenuItem key={2} value={2}>Second</MenuItem>
                        <MenuItem key={3} value={3}>Third</MenuItem>
                        <MenuItem key={4} value={4}>Fourth</MenuItem>
                        <MenuItem key={5} value={5}>Fifth</MenuItem>
                    </Field>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Day
                    </Typography>
                    <Field name="dayOfWeek_day" label="Day" component={Select}>
                        <MenuItem key={1} value={0}>Sunday</MenuItem>
                        <MenuItem key={2} value={1}>Monday</MenuItem>
                        <MenuItem key={3} value={2}>Tuesday</MenuItem>
                        <MenuItem key={4} value={3}>Wednesday</MenuItem>
                        <MenuItem key={5} value={4}>Thursday</MenuItem>
                        <MenuItem key={6} value={5}>Friday</MenuItem>
                        <MenuItem key={7} value={6}>Saturday</MenuItem>
                    </Field>
                </Grid>
            </Grid>
        )
    }
}
DayOfWeek = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
})(DayOfWeek);

export default DayOfWeek;