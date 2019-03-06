import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { reduxForm, getFormValues } from 'redux-form';

import styles from 'styles';
import { submitEvent } from 'actions';

class StepActions extends Component {

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
          submitEvent(values)
            .then(() => {
              handleNext();
            });
        } else {
          handleNext();
        }
    }

    render() {
        const { activeStep, enableFormSubmission, classes, submitting, handleSubmit } = this.props;
        console.log('event form submitting: ', submitting);
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
                disabled={!enableFormSubmission}
              >
                {this.stepActions()}
              </Button>
            </div>
          </form>
        );
    }
}

StepActions = reduxForm({
  form: 'event',
  onSubmit: submitEvent,
})(StepActions);

const mapStateToProps = (state) => ({
  values: getFormValues('event')(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  submitEvent,
}, dispatch)

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)

export default enhance(StepActions);