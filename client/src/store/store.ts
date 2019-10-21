import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { ImagesState } from './reducers/ImagesReducer';

export interface State {
  images: ImagesState;
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createReduxStore() {
  return createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(thunk)),
  );
}
