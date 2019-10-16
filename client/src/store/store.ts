import { combineReducers, createStore } from 'redux';
import { reducers } from './reducers';
import { UsersState } from './reducers/UsersReducer';

const REDUX_DEV_TOOLS_ENHANCER =
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export interface State {
  users: UsersState;
}

export function createReduxStore() {
  return createStore(combineReducers(reducers), REDUX_DEV_TOOLS_ENHANCER);
}