import { AnyAction } from 'redux';
import { DEFAULT_LOCALE } from '../../locales';
import { CHANGE_LOCALE } from '../actions';

export interface LocaleState {
  value: string;
}

const INITIAL_LOCALE_STATE: LocaleState = {
  value: DEFAULT_LOCALE,
};

export function LocaleReducer(
  state: LocaleState = INITIAL_LOCALE_STATE,
  action: AnyAction,
) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
}
