import { Module } from '@nestjs/common';
import { isWorker, worker } from 'cluster';
import * as Redis from 'ioredis';
import { ADSB_SUBSCRIBER, REDIS_CONNECTION } from '../constants';
import { RedisService } from './redis.service';

const adsbSubscriber = {
  provide: ADSB_SUBSCRIBER,
  useFactory: async () => {
    if (!isWorker) {
      return null;
    }

    const client = new Redis();

    await client.subscribe(`adsb#${worker.id}`);

    return client;
  }
};

const redisConnection = {
  provide: REDIS_CONNECTION,
  useFactory: () => {
    return new Redis();
  }
};

@Module({
  providers: [adsbSubscriber, redisConnection, RedisService],
  exports: [adsbSubscriber, redisConnection, RedisService]
})
export class RedisModule {}
