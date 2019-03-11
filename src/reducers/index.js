import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import adminReducer from './admin';
import userReducer from './user';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  admin: adminReducer,
  user: userReducer,
})
