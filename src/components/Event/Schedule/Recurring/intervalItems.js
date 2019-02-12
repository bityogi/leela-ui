import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedMessage } from 'react-intl';
import { times } from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';

class IntervalItems extends Component {

    render() {
        const { input : { value, onChange }, recurrenceType, classes } = this.props;
        
        let intervalPeriod = {
            singular : 'day',
            plural : 'days'
        }
        switch (recurrenceType) {
            case 'Weekly':
            intervalPeriod.singular = 'week';
            intervalPeriod.plural = 'weeks';
            break;

            case 'Monthly':
            intervalPeriod.singular = 'month';
            intervalPeriod.plural = 'months';
            break;

            case 'Yearly':
            intervalPeriod.singular = 'year';
            intervalPeriod.plural = 'years';
            break;

            default:
        }

        return (
           
                <List>
                    {
                        (times(10, (i) => (
                                <ListItem 
                                    button 
                                    key={i} 
                                    divider 
                                    className={classes.fullWidth}
                                    selected={value === i + 1}
                                    onClick={() => onChange(i+1)}
                                >
                                    <ListItemText primary={
                                        <FormattedMessage
                                            id="interval"
                                            defaultMessage={`{interval, number} {interval, plural, one {${intervalPeriod.singular}} other {${intervalPeriod.plural}}}`}
                                            values={{interval: i+1}}
                                        />
                                    }/>
                                </ListItem>
                            ))
                        )
                    }
                </List>
            
        )
    }
}

export default withStyles(styles)(IntervalItems);