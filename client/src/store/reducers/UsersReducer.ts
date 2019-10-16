import { AnyAction } from 'redux';
import { PUSH_DUMMY_USER } from '../actions';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UsersState {
  data: User[];
}

export const INITIAL_USERS_STATE: UsersState = {
  data: [],
};

export function UsersReducer(
  state: UsersState = INITIAL_USERS_STATE,
  action: AnyAction,
): UsersState {
  switch (action.type) {
    case PUSH_DUMMY_USER:
      return {
        ...state,
        data: [...state.data, action.payload as User],
      };
    default:
      return state;
  }
}
