import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import authReducer from 'features/auth/authSlice';
import { history } from 'utils/history';
import dashboardReducer from 'features/dashboard/dashboardSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(sagaMiddleware),
});

// Run saga after create store
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
