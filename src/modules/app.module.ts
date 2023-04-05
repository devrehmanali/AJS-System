import { envSchema } from '@config/schema/env.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from '@auth/auth.module';
import UsersModule from '@users/users.module';
import { SeedsModule } from '@/shared/seeds.module';
import { CommandModule } from 'nestjs-command';
import { MailerModule } from '@nestjs-modules/mailer';
import { UploadsModule } from "@/modules/uploads/uploads.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AppController } from '@/modules/app.controller';
import { HealthCheckModule } from './health-check/health-check.module';

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
    SeedsModule,
    CommandModule,
    UploadsModule,
    HealthCheckModule,
  ],
  controllers: [AppController]
})
export class AppModule { }
