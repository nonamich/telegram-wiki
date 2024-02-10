import { Injectable } from '@nestjs/common';

import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import { Schemas, drizzle } from '@repo/db';

import { DB } from '../db/db.types';
import { InjectDB } from '../db/decorators/inject-db.decorator';
import { TelegramI18nService } from './i18n/telegram.i18n.service';
import { SceneContext } from './interfaces';
import { BOT_NAME } from './telegram.constants';
import { TelegramService } from './telegram.service';

@Injectable()
export class TelegramChatService {
  constructor(
    private readonly tg: TelegramService,
    private readonly tgI18n: TelegramI18nService,
    @InjectBot(BOT_NAME) private bot: Telegraf<SceneContext>,
    @InjectDB() private db: DB,
  ) {}

  insetOrUpdateChat(chatId: number, lang: string) {
    return this.db
      .insert(Schemas.chat)
      .values({
        chatId,
        lang,
      })
      .onConflictDoUpdate({
        set: {
          lang,
        },
        where: drizzle.eq(Schemas.chat.chatId, chatId),
        target: Schemas.chat.chatId,
      })
      .returning({
        chatId: Schemas.chat.chatId,
        lang: Schemas.chat.lang,
      });
  }

  deleteChat(chatId: number) {
    return this.db.delete(Schemas.chat).where(drizzle.eq(Schemas.chat, chatId));
  }

  getChat(chatId: number) {
    return this.db.query.chat.findFirst({
      where: (fields, { eq }) => eq(fields.chatId, chatId),
    });
  }

  getChatInfoFromContext(ctx: SceneContext) {
    const lang = this.tgI18n.getLang(ctx.i18next.language);

    return {
      chatId: ctx.chat?.id as number,
      lang,
    };
  }

  async informChats() {
    const chats = await this.db.query.chat.findMany();

    for (const { chatId, lang: langUnsanitize } of chats) {
      try {
        await this.bot.telegram.getChat(chatId);
      } catch {
        await this.deleteChat(chatId);

        continue;
      }

      const lang = this.tgI18n.getLang(langUnsanitize);

      await this.tg.inform(chatId, lang);
    }
  }
}
