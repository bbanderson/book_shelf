import { Action } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { all, put, takeEvery } from 'redux-saga/effects';
import { LoginReqType } from '../../types';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

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

// action.payload 값이 LoginReqType을 따르도록 제한
function* loginSaga(action: Action<LoginReqType>) {
  // login 액션이 dispatch 될 때 실행되는 saga
  try {
    yield put(pending());
    // const token
  } catch (error) {}
}
function* logoutSaga() {
  // logout 액션이 dispatch 될 때 실행되는 saga
}
export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
