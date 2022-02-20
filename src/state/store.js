import { applyMiddleware, createStore } from 'redux';
import redusers from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(redusers, {}, applyMiddleware(thunk));
