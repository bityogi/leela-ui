import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import styles from 'styles';

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
        const { handleNext, goToDashboard, activeStep } = this.props;

        activeStep !== 6 ? handleNext() : goToDashboard();
    }

    render() {
        const { activeStep, enableFormSubmission, classes } = this.props;
        return (
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
        );
    }
}

export default withStyles(styles)(StepActions);