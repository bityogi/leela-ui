import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { reduxForm } from 'redux-form';

import styles from 'styles';
import { submitEvent } from 'actions';

class StepActions extends Component {

    state = {
      submitting : false
    }

    stepActions() {
        const { activeStep } = this.props;
        if(activeStep === 5) {
          return 'Accept';
        }
        if(activeStep === 6) {
          return 'Done';
        }
        return 'Next';
    }

    onBackClicked = () => {
        const { handleBack } = this.props;
        handleBack();
    }

    onNextClicked = () => {
        const { handleNext, goToDashboard, activeStep, submitEvent, values } = this.props;

        if (activeStep === 6) {
          goToDashboard();
        } else if (activeStep === 5) {
          this.setState({ submitting: true })
          submitEvent()
            .then(() => {
              this.setState({ submitting: false })
              handleNext();
            });
        } else {
          handleNext();
        }
    }

    render() {
        const { activeStep, enableFormSubmission, classes, handleSubmit } = this.props;
        const { submitting } = this.state;
        console.log('submitting event: ', submitting);
        return (
          <form onSubmit={handleSubmit}>
            <div className={classes.flexBar}>
              { activeStep !== 6 && (
                <Button
                  disabled={activeStep === 0}
                  onClick={this.onBackClicked}
                  className={classes.backButton}
                  size='large'
                >
                  Back
                </Button>
              )}
              <Button 
                variant="contained"
                color="primary"
                onClick={this.onNextClicked}
                size='large'
                disabled={!enableFormSubmission || submitting}
              >
                {this.stepActions()}
              </Button>
              {
                submitting && (
                  <CircularProgress color="primary" />
                )
              }
            </div>
          </form>
        );
    }
}

StepActions = reduxForm({
  form: 'event',
  onSubmit: submitEvent,
})(StepActions);


const mapDispatchToProps = dispatch => bindActionCreators({
  submitEvent,
}, dispatch)

const enhance = compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
)

export default enhance(StepActions);