import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';


import styles from 'styles';
import ScheduleForm from './scheduleForm';

class Schedule extends Component {

    
    render() {
        const { classes, enableSubmission, isSubmissionEnabled } = this.props;
        
        return (
            <div className={classes.bigContainer}>
                <Paper className={classes.paper}>
                    
                    <div style={{marginBottom: 32}}>
                        <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                        Schedule
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        Set your event schedule
                        </Typography>
                    </div>
                    
                    <ScheduleForm enableSubmission={enableSubmission} isSubmissionEnabled={isSubmissionEnabled} />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Schedule);