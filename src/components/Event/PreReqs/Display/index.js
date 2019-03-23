import React, { Component } from 'react';
import { map } from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { change } from 'redux-form';
import { remove } from 'lodash';

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

    renderRemoveButton = (index) => {
        const { classes } = this.props;
        return (
            <Button variant="outlined" size="small" className={classes.inlineButton} onClick={() => this.removeQuestion(index)}>
                Remove
            </Button>
        )
    }

    renderQuestions = () => {
        
        const { questions, classes } = this.props;
        return map(questions, q => {
            switch (q.type) {
                case 'Text':
                    return (
                        <div>
                            <Text question={q} key={q.index} />
                            {this.renderRemoveButton(q.index)}
                            <Divider className={classes.divider} />
                        </div>
                    )
                    
                case 'YesNo':
                    return (
                        <div>
                            <YesNo question={q} key={q.index} />
                            {this.renderRemoveButton(q.index)}
                            <Divider className={classes.divider} />
                        </div>
                    )

                case 'SingleChoice':
                    return (
                        <div>
                            <SingleChoice question={q} key={q.index} />
                            {this.renderRemoveButton(q.index)}
                            <Divider className={classes.divider} />
                        </div>
                    )
                
                case 'MultipleChoice':
                    return (
                        <div>
                            <MultiChoice question={q} key={q.index} />
                            {this.renderRemoveButton(q.index)}
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