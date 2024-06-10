import { FunctionalComponent } from 'preact';

import { useI18n } from '~/modules/i18n/i18n.utils';
import { TELEGRAM_TAG_DANGEROUSLY_HTML } from '~/modules/telegram/telegram.constants';
import { WikiNews } from '~/modules/wiki/interfaces';

import { BR, HTags, Links } from '../components';

export type NewsProps = {
  news: WikiNews;
};

export const News: FunctionalComponent<NewsProps> = ({ news: { story } }) => {
  const { t } = useI18n();

  return (
    <>
      📰 {t('in_the_news')}
      {' — '}
      <TELEGRAM_TAG_DANGEROUSLY_HTML
        dangerouslySetInnerHTML={{ __html: story }}
      />
      <BR />
      <HTags tags={['news']} />
      <BR />
      <Links />
    </>
  );
};
