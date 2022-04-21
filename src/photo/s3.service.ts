import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  s3: any;
  constructor() {
    this.s3 = new S3({ endpoint: 'https://hb.bizmrg.com' });
  }
  async uploadPhoto(imagebuffer: Buffer) {
    const params = {
      Bucket: 'jetbuild', // The name of the bucket. For example, 'sample_bucket_101'.
      Key: 'myimage', // The name of the object. For example, 'sample_upload.txt'.
      Body: imagebuffer, // The content of the object. For example, 'Hello world!".
    };
    const upload = await this.s3
      .upload({
        Bucket: 'jetbuild', // The name of the bucket. For example, 'sample_bucket_101'.
        Key: 'myimage', // The name of the object. For example, 'sample_upload.txt'.
        Body: imagebuffer, // The content of the object. For example, 'Hello world!".
      })
      .promise();
    console.log(
      this.s3.getSignedUrl('getObject', {
        Key: 'myimage',
        Bucket: 'jetbuild',
        Expires: 900,
      }),
    );
  }
}
