import { combineReducers } from '@reduxjs/toolkit';

import ticketReducer from './ticketSlice';

export const rootReducer = combineReducers({
  ticketData: ticketReducer,
});

export default rootReducer;
