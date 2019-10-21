import en from './en/index.json';
import sk from './sk/index.json';

export const DEFAULT_LOCALE = 'en';
const LOCALES: any = {
  en,
  sk,
};

export function getLocaleMessages(locale: string) {
  return LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
}
