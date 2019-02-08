import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import Routes from './routes'
import customTheme from './theme';

const theme = createMuiTheme(customTheme);


class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
