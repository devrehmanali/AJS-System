import {Command} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {RabbitMqService} from '../rabbit-mq.service';

@Injectable()
export class NotificationsSeed {
  constructor(private readonly rabbitMqService: RabbitMqService) {
  }

  @Command({
    command: 'create:notifications',
    describe: 'create notifications',
  })
  async create(): Promise<string | void> {
    const signUpNotification = await this.rabbitMqService.findOneAndUpdate({action: 'Signup to Wellavi'} , {
      action: 'Signup to Wellavi',
      in_app_notification_user: 'You Have Successfully Registered',
      in_app_notification_coach: 'You Have Successfully Registered',
      email_notification_coach: 'You Have Successfully Registered',
      email_notification_user: 'You Have Successfully Registered',
      email_notification_admin: 'have successfully registered in wellavi app',
    });

    const loginNotification = await this.rabbitMqService.findOneAndUpdate({action: 'Login to App'} , {
      action: 'Login to App',
    });

    const resetPasswordOTPEmailNotification = await this.rabbitMqService.findOneAndUpdate({action: 'Reset Password OTP'} , {
      action: 'Reset Password OTP',
      email_notification_coach: 'You Have Successfully Received otp via Email Please check',
      email_notification_user: 'You Have Successfully Received otp via Email Please check',
      email_notification_admin: 'have successfully received otp via email',
    });

    const resetPasswordNotification = await this.rabbitMqService.findOneAndUpdate({action: 'Reset Password'} , {
      action: 'Reset Password',
      email_notification_coach: 'You Have Successfully reset your password',
      email_notification_user: 'You Have Successfully reset your password',
      email_notification_admin: 'have successfully reset their password',
    });

    const updatePasswordNotification = await this.rabbitMqService.findOneAndUpdate({action: 'Update Password'} , {
      action: 'Update Password',
      email_notification_coach: 'You Have Successfully updated your password',
      email_notification_user: 'You Have Successfully updated your password',
      email_notification_admin: 'have successfully updated their password',
    });

    const trueSelfIncomplete = await this.rabbitMqService.findOneAndUpdate({action: 'TrueSelf Incomplete'} , {
      action: 'TrueSelf Incomplete',
      email_notification_coach: 'Your TrueSelf Assessment is Incomplete Please complete it ASAP',
      email_notification_user: 'Your TrueSelf Assessment is Incomplete Please complete it ASAP',
      in_app_notification_user: 'Your TrueSelf Assessment is Incomplete Please complete it ASAP',
      in_app_notification_coach: 'Your TrueSelf Assessment is Incomplete Please complete it ASAP',
      mobile_push_notification_coach: 'Your TrueSelf Assessment is Incomplete Please complete it ASAP',
      mobile_push_notification_user: 'Your TrueSelf Assessment is Incomplete Please complete it ASAP'
    });

    const trueSelfComplete = await this.rabbitMqService.findOneAndUpdate({action: 'TrueSelf Complete'} , {
      action: 'TrueSelf Complete',
      email_notification_coach: 'Your TrueSelf Assessment is complete Thanks',
      email_notification_user: 'Your TrueSelf Assessment is complete Thanks',
      in_app_notification_user: 'Your TrueSelf Assessment is complete Thanks',
      in_app_notification_coach: 'Your TrueSelf Assessment is complete Thanks',
    });

    const personalInformation = await this.rabbitMqService.findOneAndUpdate({action: 'Personal Information'} , {
      action: 'Personal Information',
      email_notification_coach: 'Personal Info updated successfully',
      email_notification_user: 'Personal Info updated successfully',
      in_app_notification_user: 'Personal Info updated successfully',
      in_app_notification_coach: 'Personal Info updated successfully',
      mobile_push_notification_coach: 'Personal Info updated successfully',
      mobile_push_notification_user: 'Personal Info updated successfully'
    });

    const savePublications = await this.rabbitMqService.findOneAndUpdate({action: 'Publications'} , {
      action: 'Publications',
      email_notification_coach: 'You Have successfully Created Publication',
      email_notification_user: 'You Have successfully Created Publication',
      in_app_notification_user: 'You Have successfully Created Publication',
      in_app_notification_coach: 'You Have successfully Created Publication',
    });

    console.log('Notification Seeding Success');
  }
}
