import { push } from 'connected-react-router';
import { Action } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import { AuthState, LoginReqType } from '../../types';

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = 'book_shelf/auth';

// Action Type + Action Creator
export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  {
    prefix,
  }
);

// Reducer
const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      ...state,
      loading: false,
      token: action.payload,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);
export default reducer;

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', {
  prefix,
});

interface LoginAction extends Action {
  payload: LoginReqType;
}

// action.payload 값이 LoginReqType을 따르도록 제한
function* loginSaga(action: LoginAction) {
  // login 액션이 dispatch 될 때 실행되는 saga
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    // localstorage 저장
    TokenService.set(token);
    yield put(success(token));
    // 로그인 성공했으므로 새로운 페이지로 push
    yield put(push('/'));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}
function* logoutSaga(action: LoginAction) {
  // logout 액션이 dispatch 될 때 실행되는 saga
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
    // localstorage 저장
    TokenService.set(token);
  } catch (error) {
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}
export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
