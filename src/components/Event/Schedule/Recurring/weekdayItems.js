import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import { map } from 'lodash';
import Checkbox from '@material-ui/core/Checkbox';

import styles from 'styles';

const weekDays = [
    { value: 0, name: 'Sunday' },
    { value: 1, name: 'Monday' },
    { value: 2, name: 'Tuesday' },
    { value: 3, name: 'Wednesday' },
    { value: 4, name: 'Thursday' },
    { value: 5, name: 'Friday' },
    { value: 6, name: 'Saturday' },
]

class WeekDayItems extends Component {

    handleToggle = (v) => {
        const { input: { onChange, value } } = this.props;
        const currentIndex = value.indexOf(v);
        const newValues = [...value];
       
        if (currentIndex === -1) {
            newValues.push(v);
        } else {
            newValues.splice(currentIndex, 1);
        }

        onChange(newValues);
    }

    render() {
        const { input : { value }, classes } = this.props;
        
        return (
           
            <List>
            {
                (map(weekDays, (day) => (
                        <ListItem 
                            button 
                            key={day.value} 
                            divider 
                            className={classes.fullWidth}
                            selected={value === day.value}
                            onClick={() => this.handleToggle(day.value)}
                        >
                            <ListItemText primary={day.name}/>
                            <Checkbox
                                checked={value.indexOf(day.value) !== -1}
                                tabIndex={-1}
                            />
                        </ListItem>
                    ))
                )
            }
        </List>
            
        )
    }
}

export default withStyles(styles)(WeekDayItems);