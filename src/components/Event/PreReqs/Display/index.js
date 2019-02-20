import React, { Component } from 'react';
import { map } from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

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
});

class DisplayQuestions extends Component {

    renderQuestions = () => {
        
        const { questions } = this.props;
        console.log('rendering questions: ', questions);
        return map(questions, q => {
            switch (q.type) {
                case 'Text':
                    return <Text question={q} key={q.index} />
                    
                case 'YesNo':
                    return <YesNo question={q} key={q.index} />

                case 'SingleChoice':
                    return <SingleChoice question={q} key={q.index} />
                
                case 'MultiChoice':
                    return <MultiChoice question={q} key={q.index} />

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