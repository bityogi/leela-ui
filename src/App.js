import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import './App.css';
import Routes from './routes'
import customTheme from './theme';

const theme = createMuiTheme(customTheme);


class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Routes />
          </MuiPickersUtilsProvider>
          
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
