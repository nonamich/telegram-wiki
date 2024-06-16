import { WikiLanguage } from '../wiki/types';
import { I18nException } from './exceptions/i18n.exception';
import { I18nContext } from './i18n.context';

export const useI18n = () => {
  const i18n = I18nContext.current();

  if (!i18n) {
    throw new I18nException("doesn't work outside i18n context!");
  }

  const language = i18n.language as WikiLanguage;

  return { ...i18n, language };
};
