import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {RootState} from './root';

const store = configureStore({
  reducer: {
    User: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
