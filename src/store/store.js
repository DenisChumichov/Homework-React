import { createStore } from 'redux';

import reducers from './reducers';

import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas/sagas'

const sagaMiddleware = createSagaMiddleware()

const initionalState = {};

const store = createStore(reducers, initionalState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)

export default store