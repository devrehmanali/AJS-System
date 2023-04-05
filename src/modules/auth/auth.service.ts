import {
  BadRequestException,
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcrypt';
import { ChangeUserPasswordDto } from '@auth/dto/change-user-password.dto';
import { User } from '@users/schemas/users.schema';
import RequestUserInterface from '@interfaces/request-user.interface';
import DecodedUser from '@auth/interfaces/decoded-user.interface';
import JwtTokensInterface from '@auth/interfaces/jwt-tokens.interface';
import AuthRepository from '@auth/auth.repository';
import { generateRandom } from '@helpers/general.helper';
import ForgotPasswordDto from '@auth/dto/forgot-password.dto';
import { Cache } from 'cache-manager';
import { MailerService } from '@nestjs-modules/mailer';
import axios from 'axios';
import { StripeService } from '@/modules/stripe/stripe.service';
import { RabbitMqService } from '@/modules/rabbit-mq/rabbit-mq.service';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_OTP,
  SIGNUP_TO_WELLAVI,
  TRUE_SELF_INCOMPLETE,
  UPDATE_PASSWORD
} from '@/constants/rabbitMqEvents';
import { COACH, EMAIL_NOT_FOUND, INCORRECT_PASSWORD } from '@/constants/constants';
import { DRAFT } from '@/constants/coachStatusConstants';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private repository: AuthRepository,
    private readonly mailerService: MailerService,
    private readonly stripeService: StripeService,
    private readonly rabbitMqService: RabbitMqService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      return EMAIL_NOT_FOUND
    } else if (user && (await bcrypt.compare(pass, user.password ?? ''))) {
      return user;
    } else {
      return INCORRECT_PASSWORD;
    }
  }

  async login(data: any): Promise<JwtTokensInterface> {
    const user = data.user
    // Data that needs to be signed with JWT
    const payload = await this.payload(user);

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
    });

    await this.repository.addRefreshToken(user.email, refreshToken);

    //check if device id exist
    if (data.body.device_id) {
      await this.usersService.createOrUpdateDeviceId(user.email, { device_id: data.body.device_id });
    }

    await this.usersService.updateByEmail(user.email, { isLoggedIn: true });

    if (!user.is_user_assessment_completed) {
      //add event into rabbitMQ Queue
      await this.rabbitMqService.eventEmitterOnRabbitMQ(TRUE_SELF_INCOMPLETE, { user_id: user.user_id });
    }

    if (!user.is_coach_assessment_completed && user.role.includes('coach')) {
      //add event into rabbitMQ Queue
      await this.rabbitMqService.eventEmitterOnRabbitMQ(TRUE_SELF_INCOMPLETE, { user_id: user.user_id });
    }

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      roles: user.role,
    };
  }

  async getRefreshTokenByEmail(email: string): Promise<string | unknown> {
    return this.repository.getToken(email);
  }

  async refreshToken(refreshToken: string): Promise<JwtTokensInterface> {
    const decodedUser = this.jwtService.decode(refreshToken) as DecodedUser;

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const oldRefreshToken = await this.getRefreshTokenByEmail(
      decodedUser.email,
    );

    // if the old refresh token is not equal to request refresh token then this user is unauthorized
    if (!oldRefreshToken || oldRefreshToken !== refreshToken) {
      throw new UnauthorizedException(
        'Authentication credentials were missing or incorrect',
      );
    }
    const payload = await this.payload(decodedUser);
    const user = await this.usersService.findUserByEmail(payload.email);
    return await this.login(user as User);
  }

  async signup(
    signUpUserDto: any,
    ReferralUserId: string | undefined,
    ReferralType: string | undefined,
  ): Promise<JwtTokensInterface | any> {
    try {
      const { password } = signUpUserDto;

      const email = await this.usersService.findUserByEmail(
        signUpUserDto.email,
      );

      if (email) {
        return null;
      }

      // // Creating Nylas Calendar
      // let authorizeNylas = await axios.post(
      //   'https://api.nylas.com/connect/authorize',
      //   {
      //     client_id: process.env.NYLAS_CLIENT_ID,
      //     provider: 'nylas',
      //     scopes: 'calendar',
      //     email: signUpUserDto.email,
      //     name: signUpUserDto.first_name + ' ' + signUpUserDto.last_name,
      //     settings: {},
      //   },
      // );
      //
      // let connectNylas = await axios.post(
      //   'https://api.nylas.com/connect/token',
      //   {
      //     client_id: process.env.NYLAS_CLIENT_ID,
      //     client_secret: process.env.NYLAS_CLIENT_SECRET,
      //     code: authorizeNylas.data?.code,
      //   },
      // );
      //
      // let calendar = await axios.post(
      //   'https://api.nylas.com/calendars',
      //   {
      //     name: signUpUserDto.first_name + "'s Calendar",
      //     description: '',
      //     location: '',
      //     timezone: 'UTC',
      //     metadata: {},
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${connectNylas?.data?.access_token}`,
      //     },
      //   },
      // );

      //Register user on stripe and create it as a customer
      const customer = await this.stripeService.createCustomerOnStripe(
        signUpUserDto.email,
        signUpUserDto.first_name,
      );


      const user = await this.usersService.createUser({
        ...signUpUserDto,
        // nylasAccountId: connectNylas.data.account_id,
        // nylasAccessToken: connectNylas.data.access_token,
        // nylasCalendarId: calendar.data.id,
        password: await AuthService.hashPassword(password),
        stripe_customer_id: customer.id,
        coach_status: DRAFT
      });

      //add event into rabbitMQ Queue
      await this.rabbitMqService.eventEmitterOnRabbitMQ(SIGNUP_TO_WELLAVI, { user_id: user.user_id });

      //check if device id exist
      if (signUpUserDto.device_id) {
        await this.usersService.createOrUpdateDeviceId(user.email, { device_id: signUpUserDto.device_id });
      }

      //insert or update id user has any referral code
      if (ReferralUserId) {
        const data = {
          user_id: user.user_id,
          referral_user_id: ReferralUserId,
          referral_type: ReferralType,
        };

        const followData = {
          user_id: user.user_id,
          following_user_id: ReferralUserId,
        };

      }

      const payload = await this.payload(user);

      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH,
      });
      await this.repository.addRefreshToken(payload.email, refreshToken);

      await this.usersService.updateByEmail(user.email, { isLoggedIn: true });

      return {
        user: user,
        access_token: this.jwtService.sign(payload),
        roles: user.role,
        refresh_token: refreshToken,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async changePassword(
    changeUserPasswordDto: ChangeUserPasswordDto,
    user: RequestUserInterface,
  ): Promise<string | unknown> {
    // Check if oldPassword matches user password
    if (
      !(await this.validateUser(user.email, changeUserPasswordDto.oldPassword))
    ) {
      // No meaningful message returned because of security measures. Ambiguous response
      throw new BadRequestException();
    }

    const userData = await this.usersService.findUserByEmail(user.email)
    //add event into rabbitMQ Queue
    await this.rabbitMqService.eventEmitterOnRabbitMQ(UPDATE_PASSWORD, { user_id: userData?.user_id });

    return this.usersService.updateUser(
      { email: user.email } as User,
      {
        password: await AuthService.hashPassword(
          changeUserPasswordDto.password,
        ),
      } as User,
    );
  }

  public async verifyToken(
    token: string,
    secret: string,
  ): Promise<DecodedUser | null> {
    try {
      return (await this.jwtService.verifyAsync(token, {
        secret,
      })) as DecodedUser | null;
    } catch (error) {
      return null;
    }
  }

  public static async hashPassword(password: string): Promise<string> {
    // Generating new hashed password to save in database
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async forgotPasswordOtp(email: string): Promise<string> {
    const userData = await this.usersService.findUserByEmail(email)
    if (!userData) {
      return '';
    }
    const otp = generateRandom(20);

    //add event into rabbitMQ Queue
    await this.rabbitMqService.eventEmitterOnRabbitMQ(RESET_PASSWORD_OTP, { user_id: userData.user_id });

    // Todo needs to generate mail
    this.mailerService
      .sendMail({
        to: email, // list of receivers
        subject: 'Forgot Password Link Wellavi', // Subject line
        html: `<h1>Please click the below link and reset your password. Your code will be expired in 5 minutes. Thanks!</h1></br><a class='button' href=${process.env.BASE_URL_FRONT_END}/new-password?token=${otp}&email=${email}>Click here to reset Password</a>`, // plaintext body
      })
      .then(async (res) => {
        await this.repository.setForgetOtp(`forget#${email}`, otp);
        return otp;
      })
      .catch(() => {
        return;
      });
    return otp;
    // return this.repository.setForgetOtp(`forget#${email}`, otp, 300); // Expiry is set to 5 minutes 60s*5 = 300s
  }

  async forgotPassword(reqBody: ForgotPasswordDto): Promise<string | unknown> {
    const res = {
      status: 400,
      message: 'invalid request',
    };
    const user = await this.usersService.findUserByEmail(reqBody.email);
    if (!user) {
      res.message = 'no user exist';
      return res;
    }

    const otp = await this.repository.getForgetOtp(reqBody.email);
    if (otp != reqBody.otp) {
      res.message = 'invalid code please try again';
      return res;
    }
    try {
      const updateResult = await this.usersService.updateUser(
        { email: reqBody.email } as User,
        {
          password: await AuthService.hashPassword(reqBody.password),
        } as User,
      );
      //add event into rabbitMQ Queue
      await this.rabbitMqService.eventEmitterOnRabbitMQ(RESET_PASSWORD, { user_id: user.user_id });

      return updateResult;
    } catch (e: any) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async socialAuthRedirect(
    req: any,
    type: string,
  ): Promise<JwtTokensInterface> {
    //Insert  user in database after google login
    let access_token = '';
    let user: User | null;
    const payload = await this.payload(req.user);

    user = await this.usersService.findUserByEmail(req.user.email);
    if (user) {
      access_token = this.jwtService.sign(payload);
    } else {
      user = await this.usersService.createUser({
        ...payload,
        password: await AuthService.hashPassword('123456789'),
        user_id: req.user.user_id,
        isLoggedIn: true,
      });
      access_token = req.user.accessToken;
    }

    //Add refresh token
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
    });
    await this.repository.addRefreshToken(payload.email, refreshToken);

    return {
      access_token: access_token,
      roles: user.role,
      refresh_token: refreshToken,
    };
  }

  deleteTokenByKey(email: string): Promise<number> {
    return this.repository.removeToken(email);
  }

  async logout(token: string): Promise<object> {
    const decodedUser: DecodedUser | null = await this.verifyToken(
      token,
      process.env.JWT_SECRET ?? '',
    );

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const deletedUsersCount = await this.deleteTokenByKey(decodedUser.email);

    await this.usersService.updateByEmail(decodedUser.email, {
      isLoggedIn: false,
    });

    if (deletedUsersCount === 0) {
      throw new NotFoundException();
    }

    return {
      message: 'Successfully Logged out',
    };
  }

  async payload(data: any) {
    return {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    };
  }
}
