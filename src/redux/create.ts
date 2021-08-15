import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './modules/reducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './modules/rootSaga';
import { routerMiddleware } from 'connected-react-router';
import { Middleware } from 'redux';
import history from '../history';
import TokenService from '../services/TokenService';

const create = () => {
  const token = TokenService.get();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware, routerMiddleware(history)];
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);
  const store = createStore(
    reducer(history),
    { auth: { token, loading: false, error: null } },
    enhancer
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default create;
