import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { IntlProvider } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

import './App.css';
import Routes from './routes'
import customTheme from './theme';
import styles from './styles';
import Topbar from 'components/Topbar';
import Notification from 'components/common/notification';
const theme = createMuiTheme(customTheme);

class App extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <IntlProvider locale="en">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <React.Fragment>
                <CssBaseline />
                <Topbar />
                <div className={classes.root}>
              
                  <Routes />
                </div>
                <Notification />
              </React.Fragment>
            </MuiPickersUtilsProvider>
          </IntlProvider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
