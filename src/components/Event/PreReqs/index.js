import React, { Component } from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import PreReqsForm from './prereqsForm';
import DisplayQuestions from './Display';

class PreReqs extends Component {

    

    render() {
        const { classes, questions, enableSubmission } = this.props;
        console.log('questions in pre-reqs index: ', questions);
        return (
            <div className={classes.bigContainer}>
              <Paper className={classes.paper}>
                <div>
                  <div style={{marginBottom: 32}}>
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                      Pre Requisites
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Set up any pre-requisites you may require for this event registration
                    </Typography>
                  </div>
                  
                  <PreReqsForm questions={questions} enableSubmission={enableSubmission}/>
                </div>
              </Paper>
              <DisplayQuestions questions={questions} />
            </div>
        );
    }
}

const selector = formValueSelector('event')

PreReqs  = connect(state => {
    const questions = selector(state, 'questions');
    return {
        questions,
    }
})(PreReqs)

export default withStyles(styles)(PreReqs);