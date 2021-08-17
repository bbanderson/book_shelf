import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '../components/List';
import { IBook, RootState } from '../types';
import { getBooks as getBooksSagaStart } from '../redux/modules/books';
import { deleteBook as deleteBookSagaStart } from '../redux/modules/books';
import { logout as logoutSagaStart } from '../redux/modules/auth';
import { push } from 'connected-react-router';

export default function ListContainer() {
  const dispatch = useDispatch();
  const books = useSelector<RootState, IBook[] | null>(
    (state) => state.books.books
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error
  );
  const getBooks = useCallback(() => {
    dispatch(getBooksSagaStart());
  }, [dispatch]);
  const goAdd = useCallback(() => {
    // dispatch 호출 : BookService
    dispatch(push('/add'));
  }, [dispatch]);
  const logout = useCallback(() => {
    dispatch(logoutSagaStart());
  }, [dispatch]);
  const deleteBook = useCallback(
    (bookId: number) => {
      dispatch(deleteBookSagaStart(bookId));
    },
    [dispatch]
  );
  return (
    <List
      books={books}
      loading={loading}
      getBooks={getBooks}
      error={error}
      goAdd={goAdd}
      logout={logout}
      deleteBook={deleteBook}
    />
  );
}
