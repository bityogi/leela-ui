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
        const { input : { onChange }, label, meta: { touched}, recurrenceType, classes } = this.props;
        
        console.log('recurrenceType is: ', recurrenceType);
        return (
           
                <List>
                    {
                        (times(10, (i) => (
                                <ListItem button key={i} divider className={classes.fullWidth}>
                                    <ListItemText primary={
                                        <FormattedMessage
                                            id="interval"
                                            defaultMessage={`{interval, number} {interval, plural, one {day} other {days}}`}
                                            values={{interval: i+1}}
                                        />
                                    }>
                                        
                                    </ListItemText>
                                    
                                </ListItem>
                            ))
                        )
                    }
                </List>
            
        )
    }
}

export default withStyles(styles)(IntervalItems);