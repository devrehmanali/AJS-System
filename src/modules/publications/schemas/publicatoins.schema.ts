import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type PublicationsDocument = Publications & Document;

@Schema({
  collection: 'publications',
  timestamps: true,
})
export class Publications {
  @ApiProperty()
  @Prop({
    type: ObjectId,
    default: () => {
      return new ObjectId();
    },
  })
  _id: ObjectId;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  user_id: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  post_image: string;

  @Prop({
    index: true,
    type:Array,
  })
  dimensions?: [];

  @Prop({
    index: true,
    type:Boolean,
    default:false
  })
  is_shared_wellavi?: boolean;

  @Prop({
    index: true,
    type:Boolean,
    default:false
  })
  is_shared_my_profile?: boolean;

  @Prop({
    index: true,
    type:Boolean,
    default:false
  })
  is_shared_community?: boolean;

  @Prop({
    index: true,
    type:Array,
  })
  community_ids?: [];

  @Prop({
    index: true,
    type:Boolean,
    default:false
  })
  is_published?: boolean;

  @Prop({
    index: true,
    type:Boolean,
    default:false
  })
  is_archived?: boolean;
}

export const PublicationsSchema = SchemaFactory.createForClass(Publications);