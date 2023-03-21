import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadsService {
  constructor() {}

  async uploadFile(dataBuffer: Buffer, fileName: string): Promise<any> {
    const s3 = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const uploadResult = await s3
      .upload({
        Bucket: 'wellavi',
        Body: dataBuffer,
        ACL: 'public-read',
        Key: fileName,
      })
      .promise();

    return uploadResult;
  }

  //upload file with base64
  async uploadFileBase64(dataBuffer: any, fileName: string): Promise<any> {
    const buf = Buffer.from(
      dataBuffer.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: 'wellavi',
        Body: buf,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        Key: fileName,
      })
      .promise();

    return uploadResult;
  }

  //upload video with base64
  async uploadVideoBase64(dataBuffer: any, fileName: string): Promise<any> {
    const buf = Buffer.from(dataBuffer, 'base64');
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: 'wellavi',
        Body: buf,
        ACL: 'public-read',
        ContentType: 'video/mp4',
        ContentEncoding: 'base64',
        Key: fileName,
      })
      .promise();

    return uploadResult;
  }
}
