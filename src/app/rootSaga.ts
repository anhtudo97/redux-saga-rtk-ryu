import { authSaga } from 'features/auth/authSaga';
import counterSaga from 'features/counter/counterSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import { all } from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello Saga');
}

export default function* rootSaga() {
  console.log('Root Saga');
  yield all([helloSaga(), counterSaga(), authSaga(), dashboardSaga()]);
}
