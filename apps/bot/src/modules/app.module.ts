import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TelegrafModule } from 'nestjs-telegraf';

import { DBModule } from './db/db.module';
import { I18nModule } from './i18n/i18n.module';
import { RedisModule } from './redis/redis.module';
import { TelegramModule } from './telegram/telegram.module';
import { TelegramOptionsFactory } from './telegram/telegram.options-factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          username: config.getOrThrow('REDIS_USERNAME'),
          password: config.getOrThrow('REDIS_PASSWORD'),
          host: config.getOrThrow('REDIS_HOST'),
          port: config.getOrThrow('REDIS_PORT'),
        };
      },
    }),
    DBModule.forRoot(),
    I18nModule,
    TelegrafModule.forRootAsync({
      imports: [TelegramModule],
      useClass: TelegramOptionsFactory,
    }),
  ],
})
export class AppModule {}
