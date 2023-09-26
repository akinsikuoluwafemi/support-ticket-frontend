import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import thunk from 'redux-thunk';
import { ReactNode } from 'react';

export const mockStore = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={mockStore}>{children}</Provider>;
};

export default Wrapper;
