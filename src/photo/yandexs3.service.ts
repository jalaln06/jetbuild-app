import { Injectable } from '@nestjs/common';
import * as EasyYandexS3 from 'easy-yandex-s3';

@Injectable()
export class YandexStorageService {
  private readonly yandexStorage;
  constructor() {
    this.yandexStorage = new EasyYandexS3({
      auth: {
        accessKeyId: process.env.YANDEX_STORAGE_KEY_ID,
        secretAccessKey: process.env.YANDEX_STORAGE_KEY,
      },
      Bucket: process.env.YANDEX_STORAGE_BUCKET_NAME,
      debug: false,
    });
  }
  async save(data: Buffer) {
    console.log(data);
    const upload = await this.yandexStorage.Upload(
      { buffer: data.buffer },
      '/photos/',
    );
    if (upload === false) {
      console.log('Something went wrong when uploading photo to Yandex Cloud');
      return;
    }
    return upload.Location;
  }
}
