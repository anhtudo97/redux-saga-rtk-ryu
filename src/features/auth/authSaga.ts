import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { fork, call, put, delay, take, takeLatest } from 'redux-saga/effects';
import { history } from 'utils/history';
import { LoginPayload, authActions } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);

    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Tuanh',
      })
    );

    // redirect to admin page
    history.push('/admin/dashboard');
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  console.log('handle logout');

  yield delay(500);
  localStorage.removeItem('access_token');

  // redirect to login page
  history.push('/login');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield takeLatest(authActions.logout.type, handleLogout);
    // yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
