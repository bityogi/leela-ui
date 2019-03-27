import {
    MY_LOCATIONS
  } from 'actions/types';
  
  const initialState = []
  
  export default function usersReducer (state = initialState, action) {
  
    switch (action.type) {
      case MY_LOCATIONS:
        console.log('MY_LOCATIONS payload date: ', action.payload);
        return action.payload;
      
      default:
        return state;
    }
  
  }