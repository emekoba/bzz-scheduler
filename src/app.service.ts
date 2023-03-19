import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import axios from 'axios';
@Injectable()
export class AppService {
  constructor(@InjectRepository(Media) private mediaRepo: Repository<Media>) {}

  instagramURL = '';

  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  fetchIntagramData() {
    const resp = axios.get(this.instagramURL, {
      headers: {},
    });

    const payload: [] = [];
    const mediaDocList: Array<Media> = [];

    return Promise.all(
      payload.map(async (k) => {
        const mediaDoc = this.mediaRepo.create({
          name: k['name'],
        });

        const savedDoc: Media = await this.mediaRepo.save(mediaDoc);

        mediaDocList.push(savedDoc);
      }),
    ).then((res: Array<any>) => {
      console.log(
        '🚀 ~ file: app.service.ts:26 ~ AppService ~ ).then ~ res:',
        res.map((e) => (e != undefined ? e : {})),
      );
    });
  }
}
