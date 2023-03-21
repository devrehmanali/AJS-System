import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '@users/schemas/users.schema';
import {EMAIL_NOT_FOUND, INCORRECT_PASSWORD} from '@/constants/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (user === INCORRECT_PASSWORD) {
      throw new UnauthorizedException(INCORRECT_PASSWORD);
    } else if (user === EMAIL_NOT_FOUND) {
      throw new UnauthorizedException(EMAIL_NOT_FOUND);
    }

    delete user.password;
    return user;
  }
}
