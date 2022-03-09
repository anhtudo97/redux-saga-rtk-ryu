import { PayloadAction } from '@reduxjs/toolkit';
import { delay, takeEvery, put, takeLatest, call } from 'redux-saga/effects';
import { fetchCount } from './counterAPI';
import { increment, incrementBySaga, incrementBySagaSuccess } from './counterSlice';

function* test(){
  yield fetchCount(2)

  // and recommendation
  yield call(fetchCount, 2)
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
