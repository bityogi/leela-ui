import React, { Component } from 'react';
import { map } from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { change } from 'redux-form';
import { remove } from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import store from 'store';
import Text from './text';
import YesNo from './yesNo';
import SingleChoice from './singleChoice';
import MultiChoice from './multiChoice';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 3,
        textAlign: 'left',
        color: theme.palette.text.secondary,
      },
    inlineButton: {
        display: 'inline',
        marginLeft: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 1,
    },
    divider: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    }
});

class DisplayQuestions extends Component {

    removeQuestion = (index) => {
        const { questions } = this.props;
        const newQuestions = remove(questions, (q) => {
            return q.index !== index
        })
        store.dispatch(change('event', 'questions', newQuestions));
    }

    renderMetadata = (question) => {

    }

    renderQuestionMeta = (q) => {
        const { classes } = this.props;

        return (
            <div>
                <FormControlLabel
                    control={
                        <Checkbox checked={q.isRequired === true} value="isRequired" disabled={true} />
                    }
                    label="Is Required"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={q.affectPrice === true} value="affectPrice" disabled={true} />
                    }
                    label="Affects Price"
                />

                <Button variant="outlined" size="small" className={classes.inlineButton} onClick={() => this.removeQuestion(q.index)}>
                    Remove
                </Button>
            </div>
            
        )
    }

    renderQuestions = () => {
        
        const { questions, classes } = this.props;
        return map(questions, q => {
            switch (q.type) {
                case 'Text':
                    return (
                        <div key={q.index}>
                            <Text question={q} key={q.index} />
                            {this.renderQuestionMeta(q)}
                            <Divider className={classes.divider} />
                        </div>
                    )
                    
                case 'YesNo':
                    return (
                        <div key={q.index}>
                            <YesNo question={q} key={q.index} />
                            {this.renderQuestionMeta(q)}
                            <Divider className={classes.divider} />
                        </div>
                    )

                case 'SingleChoice':
                    return (
                        <div key={q.index}>
                            <SingleChoice question={q} key={q.index} />
                            {this.renderQuestionMeta(q)}
                            <Divider className={classes.divider} />
                        </div>
                    )
                
                case 'MultipleChoice':
                    return (
                        <div key={q.index}>
                            <MultiChoice question={q} key={q.index} />
                            {this.renderQuestionMeta(q)}
                            <Divider className={classes.divider} />
                        </div>
                    )

                default:
                    return null
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper}>
                    {this.renderQuestions()}
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(DisplayQuestions);