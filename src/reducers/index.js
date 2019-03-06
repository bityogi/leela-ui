import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import adminReducer from './admin';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  admin: adminReducer,
})
