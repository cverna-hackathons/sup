import { Dispatch } from 'redux';
import { LOAD_USERS } from './index';
import { Fetcher } from '../Fetcher';

export function fetchUsers() {
  return async (dispatch: Dispatch) => {
    const { data } = (await Fetcher.get('/users')) as any;
    dispatch({
      type: LOAD_USERS,
      payload: data.users,
    });
  };
}
