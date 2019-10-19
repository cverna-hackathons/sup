import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { UsersState } from './reducers/UsersReducer';

export interface State {
  users: UsersState;
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createReduxStore() {
  return createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(thunk)),
  );
}
