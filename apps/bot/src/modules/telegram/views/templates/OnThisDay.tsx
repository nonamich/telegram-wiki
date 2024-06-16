import dayjs from 'dayjs';
import { FunctionalComponent } from 'preact';

import { Utils } from '@repo/shared';

import { useI18n } from '~/modules/i18n/i18n.utils';
import { WikiOnThisDay } from '~/modules/wiki/types';
import { WikiHelper } from '~/modules/wiki/wiki.helper';

import { TELEGRAM_MAX_ARTICLES_PER_POST } from '../../telegram.constants';
import { BR, Description, Links, NewLine, Title } from '../components';

export type OnThisDayProps = {
  event: WikiOnThisDay;
};

const icon = '🏛️';

export const OnThisDay: FunctionalComponent<OnThisDayProps> = ({
  event: { pages, text, year },
}) => {
  const { language, t } = useI18n();
  const date = dayjs().locale(language).year(year);
  const link = {
    text: t('more_events'),
    url: WikiHelper.getOnThisDayURL(language),
  };

  return (
    <>
      {icon} {Utils.capitalizeFirstLetter(text)} ({date.format('DD MMMM YYYY')})
      <BR />
      {pages.slice(0, TELEGRAM_MAX_ARTICLES_PER_POST).map((page, index) => {
        const semicolon = ';';
        const title = page.titles.normalized;
        let titleEnd = '';
        let descriptionEnd = '';

        if (!page.description) {
          titleEnd += semicolon;
        } else {
          descriptionEnd += semicolon;
        }

        return (
          <>
            <>{index > 0 && <NewLine />}• </>
            <Title title={title} url={page.content_urls.desktop.page} />
            {titleEnd}
            <Description
              description={page.description}
              hyphen="-"
              end={descriptionEnd}
            />
          </>
        );
      })}
      <BR />
      <Links link={link} />
    </>
  );
};
