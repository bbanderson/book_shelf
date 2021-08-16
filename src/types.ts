import { RouterState } from 'connected-react-router';
import { Action } from 'redux';
import { AnyAction, Reducer } from 'redux';

export type LoginReqType = {
  email: string;
  password: string;
};

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

export interface BooksState {
  books: IBook[] | null;
  loading: boolean;
  error: Error | null;
}

export interface RootState {
  auth: AuthState;
  books: BooksState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

export interface IBook {
  bookId: number;
  title: string;
  author: string;
  message: string;
  url: string;
  createdAt: string;
}

export interface BookReqType {
  title: string;
  comment: string;
  author: string;
  url: string;
}

export interface AddBookAction extends Action {
  payload: BookReqType;
}