import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './modules/reducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './modules/rootSaga';

const create = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: any[] = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};

export default create;
