import { Injectable } from '@nestjs/common';
import AWS, { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  s3: any;
  constructor() {
    this.s3 = new S3({
      endpoint: 'https://hb.bizmrg.com',
    });
  }
  async uploadPhotoToS3(imagebuffer: Buffer, key: number) {
    const ky = key.toString();
    return await this.s3
      .upload({
        Bucket: 'jetbuild', // The name of the bucket. For example, 'sample_bucket_101'.
        Key: ky, // The name of the object. For example, 'sample_upload.txt'.
        Body: imagebuffer.buffer, // The content of the object. For example, 'Hello world!".
      })
      .promise();
  }
  async updateKey(key: number): Promise<string> {
    const ky = key.toString();
    console.log(ky);
    const url = await this.s3.getSignedUrl('getObjetc', {
      Bucket: 'jetbuild',
      Key: ky,
      expires: 900,
    });
    console.log(url);
    return url;
  }
}
