import { Role } from '@enums/role.enum';
import { Prop } from '@nestjs/mongoose';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @Prop({ type: [String], enum: Role, default: [Role.NORMAL_USER] })
  roles: Role[];
}
