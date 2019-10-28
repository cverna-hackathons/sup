import { Dispatch } from 'redux';
import { LOAD_IMAGES, UPLOAD_IMAGE } from './index';
import { Fetcher } from '../Fetcher';

export function uploadImage(image: File) {
  const data = new FormData();

  data.append('image', image);
  return async (dispatch: Dispatch) => {
    const { data: response } = (await Fetcher.post('/images', data)) as any;
    dispatch({
      type: UPLOAD_IMAGE,
      payload: response,
    });
    console.log('fetch imgs now');
  };
}

export function fetchImages() {
  return async (dispatch: Dispatch) => {
    const { data } = (await Fetcher.get('/images')) as any;
    dispatch({
      type: LOAD_IMAGES,
      payload: data.images,
    });
  };
}
