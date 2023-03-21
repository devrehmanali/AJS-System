import { ObjectId } from 'mongoose';

export default interface RequestUserInterface {
  readonly _id?: ObjectId;
  readonly username: string;
  readonly email: string;
  readonly user_id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly role: string[];
}
