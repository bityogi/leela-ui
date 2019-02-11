import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import { times } from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';

const validate = (values) => {
    const errors = {}

    if (!values.startDate) {
        errors.startDate = 'Required'
    }

    return errors;
}

class Interval extends Component {

    renderIntervals = () => {
        const { recurrenceType } = this.props;
        console.log('recurrenceType is: ', recurrenceType);
        return (
            <List>
                {
                    (times(10, (i) => (
                            <ListItem button key={i}>
                                <ListItemText primary={
                                    <FormattedMessage
                                        id="interval"
                                        defaultMessage={`{interval, number} {interval, plural, one {day} other {days}}`}
                                        values={{interval: i+1}}
                                    />
                                } />
                                <Divider />
                            </ListItem>
                        ))
                    )
                }
            </List>
        )
        
        
    }

    handleFormSubmit = (values) => {
        console.log('interval form values: ', values);
    }

    render() {
        const { handleSubmit, classes } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Interval
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {this.renderIntervals()}
                    </Typography>
            </Grid>
            </form>
            
        )
    }
}

Interval = reduxForm({
    form: 'intervalForm',
    validate,
    warn: () => {}
})(Interval)

export default withStyles(styles)(Interval);