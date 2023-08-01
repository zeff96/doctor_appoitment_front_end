import { configureStore, combineReducers } from '@reduxjs/toolkit';
import doctorsReducer from './doctors/doctorSlice';
import userReducer from './users/userSlice';

const rootReducer = combineReducers({
  doctors: doctorsReducer,
  user: userReducer,
});

const setupStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  preloadedState,
});
export default setupStore;
