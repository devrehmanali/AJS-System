import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import UsersModule from '@users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import AuthRepository from '@auth/auth.repository';
import { GoogleStrategy } from '@auth/strategies/google.strategy';
import { LinkedinStrategy } from '@auth/strategies/linkedin.strategy';
import { FacebookStrategy } from '@auth/strategies/facebook.strategy';
import {ReferralModule} from "@/modules/referral/referral.module";
import {FollowRequestModule} from "@/modules/follow-request/follow-request.module";
import {StripeModule} from '@/modules/stripe/stripe.module';
import {RabbitMqModule} from '@/modules/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    ReferralModule,
    FollowRequestModule,
    StripeModule,
    RabbitMqModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.get('JWT_EXPIRY')),
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 300,
      isGlobal: true,
    }),
  ],
  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    LinkedinStrategy,
    FacebookStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
