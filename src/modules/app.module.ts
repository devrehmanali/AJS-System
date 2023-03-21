import { envSchema } from '@config/schema/env.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from '@auth/auth.module';
import UsersModule from '@users/users.module';
import QuestionsModule from '@/modules/questions/questions.module';
import { SeedsModule } from '@/shared/seeds.module';
import { CommandModule } from 'nestjs-command';
import { MailerModule } from '@nestjs-modules/mailer';
import ProfileModule from './profile/profile.module';
import SettingModule from "@/modules/setting/setting.module";
import {UploadsModule} from "@/modules/uploads/uploads.module";
import { StripeModule } from './stripe/stripe.module'
import { FollowRequestModule } from './follow-request/follow-request.module';
import { ReferralModule } from './referral/referral.module';
import { AnswersModule } from './answers/answers.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { resolve } from 'path';
import { PublicationsModule } from './publications/publications.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SessionsModule } from './sessions/sessions.module';
import { ViewsModule } from './views/views.module';
import {AppController} from '@/modules/app.controller';
import { CommunitiesModule } from './communities/communities.module';
import { NylasModule } from './nylas/nylas.module';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReasoningModule } from './reasoning/reasoning.module';
import { WalletAccountsModule } from './wallet-accounts/wallet-accounts.module';
import { LedgerModule } from './ledger/ledger.module';
import { ProductsModule } from './products/products.module';
import { SpecializationModule } from './specialization/specialization.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { WellnessDimensionsModule } from './wellness-dimensions/wellness-dimensions.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(
        (() => {
          const publicDir = resolve('./public/');
          const servePath = '/';

          return {
            rootPath: publicDir,
            // serveRoot - if you want to see files on another controller,
            // e.g.: http://localhost:8088/files/1.png
            serveRoot: servePath,
            exclude: ['/api*'],
          };
        })()
    ),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"Wellavi" <mails@wellavi.com>',
      },
    }),
    AuthModule,
    UsersModule,
    ProfileModule,
    QuestionsModule,
    SeedsModule,
    CommandModule,
    SettingModule,
    UploadsModule,
    StripeModule,
    FollowRequestModule,
    ReferralModule,
    AnswersModule,
    PublicationsModule,
    ReviewsModule,
    SessionsModule,
    ViewsModule,
    CommunitiesModule,
    NylasModule,
    RabbitMqModule,
    NotificationsModule,
    ReasoningModule,
    ProductsModule,
    WalletAccountsModule,
    LedgerModule,
    SpecializationModule,
    HealthCheckModule,
    WellnessDimensionsModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
