import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';

import styles from 'styles';

class Summary extends Component {

    render() {
        const { classes, values } = this.props;
        console.log('event values: ', values);

        return (
            <div className={classes.smallContainer}>
              <Paper className={classes.paper}>
                <div>
                  <div style={{marginBottom: 32}}>
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                      Event Summary
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Please review event details
                    </Typography>
                  </div>
                  
                  
                </div>
              </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  values: getFormValues('event')(state),
})

const enhance = compose(
  connect(mapStateToProps, null),
  withStyles(styles),
)

export default enhance(Summary);