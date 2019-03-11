import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import clsx from 'clsx';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { hideNotification } from 'actions';

const styles = theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit * 1,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  });

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export class Notification extends Component {

    onClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.hideNotification();
    }

    render() {
        const { notification: { type, message, duration }, classes, } = this.props;
        const Icon = variantIcon[type];
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={!!message}
                autoHideDuration={duration}
                onClose={this.onClose}
                >

            
                <SnackbarContent
                    className={classes[type]}
                    aria-describedby="client-notification"
                    message={
                        <span id="client-notification" className={classes.message}>
                            <Icon className={clsx(classes.icon, classes.iconVariant)} />
                            {message}
                        </span>
                    }
                    action={[
                        <IconButton
                            edge="end"
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.onClose}
                        >
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    ]}
                />
            </Snackbar>
        )
    }
}

const mapStateToProps = state => ({
    notification: state.admin.notification,
});

const mapDispatchToProps = {
  hideNotification
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)
export default enhance(Notification);