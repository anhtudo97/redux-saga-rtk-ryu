import { PayloadAction } from '@reduxjs/toolkit';
import { delay, takeEvery, put, takeLatest } from 'redux-saga/effects';
import { increment, incrementBySaga, incrementBySagaSuccess } from './counterSlice';

export function* log(action: PayloadAction) {
  console.log('Log', action);
}

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Waiting 2s!');

  // Wait 2s
  yield delay(2000);
  console.log('Waiting done, dispatch action');

  // Dispatch action
  yield put(incrementBySagaSuccess(action.payload));
}

export default function* counterSaga() {
  console.log('Counter Saga');

  // yield takeEvery(incrementBySaga.toString(), handleIncrementSaga);
  yield takeLatest(incrementBySaga.toString(), handleIncrementSaga);
}
