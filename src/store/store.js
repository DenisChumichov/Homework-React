import { createStore } from 'redux';

import reducers from './reducers';
import middlewares from './middlewares';


const initionalState = {};

const store = createStore(reducers, initionalState, middlewares);

export default store