import { Scenes } from 'telegraf';

import { WikiArticle } from '~/modules/wiki/interfaces';

import { Tag } from '../views/telegram.views.type';

export interface TelegramSendArticleList {
  chatId: number;
  title: string;
  articles: WikiArticle[];
  icon: string;
  tags: Tag[];
}

export interface Context extends Scenes.SceneContext {}
