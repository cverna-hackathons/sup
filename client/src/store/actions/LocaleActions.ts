import { CHANGE_LOCALE } from './index';

export function changeLocale(newLocale: string) {
  return {
    type: CHANGE_LOCALE,
    payload: newLocale,
  };
}
