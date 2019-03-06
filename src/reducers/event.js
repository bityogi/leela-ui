import {
    SUBMIT_EVENT,
    SUBMIT_EVENT_SUCCESS,
    SUBMIT_EVENT_FAIL,
    SUBMIT_EVENT_RESET,
  } from 'actions/types';
  
  const initialState = {
    status: ''
  }
  
  
  export default function reducer (state = initialState, action) {
    switch (action.type) {
      case SUBMIT_EVENT:
        return { ...state, status : 'submitting' }
  
      case SUBMIT_EVENT_SUCCESS:
        return { ...state, status: 'success' };
    
      case SUBMIT_EVENT_FAIL:
        return { ...state, status: 'fail' };

      case SUBMIT_EVENT_RESET:
        return { ...state, status: '' };
        
      default:
        return state;
    }
  }
  