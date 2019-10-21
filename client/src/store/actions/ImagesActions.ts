import { Dispatch } from 'redux';
import { LOAD_IMAGES } from './index';
import { Fetcher } from '../Fetcher';

export function fetchImages() {
  return async (dispatch: Dispatch) => {
    const { data } = (await Fetcher.get('/images')) as any;
    dispatch({
      type: LOAD_IMAGES,
      payload: data.images,
    });
  };
}
