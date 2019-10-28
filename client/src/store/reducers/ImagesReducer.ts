import { AnyAction } from 'redux';
import { LOAD_IMAGES, UPLOAD_IMAGE } from '../actions';

export interface Image {
  id: number;
  fileName: string;
  type: string;
  src: string;
}

export interface ImagesState {
  data: Image[];
}

export const INITIAL_IMAGES_STATE: ImagesState = {
  data: [],
};

export function ImagesReducer(
  state: ImagesState = INITIAL_IMAGES_STATE,
  action: AnyAction,
): ImagesState {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
      };
    case LOAD_IMAGES:
      return {
        ...state,
        data: [...(action.payload as Image[])],
      };
    default:
      return state;
  }
}
