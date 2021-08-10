import { createActions, handleActions } from 'redux-actions';

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
export function* authSaga() {}
