import { AnyAction } from 'redux';
import { LOAD_USERS } from '../actions';

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
    case LOAD_USERS:
      return {
        ...state,
        data: [...(action.payload as User[])],
      };
    default:
      return state;
  }
}
