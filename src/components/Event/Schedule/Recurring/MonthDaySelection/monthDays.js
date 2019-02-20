import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { white } from 'ansi-colors';
import { times } from 'lodash';

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
      backgroundColor: white,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });

class MonthDays extends Component {

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
        const { classes, input : { value } } = this.props;
        console.log('value of monthDays = ', value)
        return (
            <Grid container item xs={12}>
                <Grid item xs={12}>
                    {
                        times(31, (i) => (
                            <Fab 
                                key={i}
                                size="small" 
                                color={ value.includes(i + 1) ? 'primary' : 'default' } 
                                aria-label={i + 1} 
                                className={classes.margin}
                                onClick={() => this.handleToggle(i + 1)}
                            >
                                {i + 1}
                            </Fab>
                        ))
                    }
                    
                </Grid>
                
            </Grid>
        )
    }
}

export default withStyles(styles)(MonthDays);