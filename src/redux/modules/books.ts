import { createActions, handleActions } from 'redux-actions';
import { all } from 'redux-saga/effects';

interface Book {}

interface BooksState {
  books: Book[] | null;
  loading: boolean;
  error: Error | null;
}

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const prefix = 'book_shelf/books';

export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  { prefix }
);

const reducer = handleActions<BooksState, Book[]>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      ...state,
      loading: false,
      books: action.payload,
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

export function* booksSaga() {
  yield all([]);
}
