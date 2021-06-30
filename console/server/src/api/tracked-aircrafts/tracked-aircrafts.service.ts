import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CONNECTION } from '../../common/constants';
import { Redis } from 'ioredis';

@Injectable()
export class TrackedAircraftsService {
  constructor(@Inject(REDIS_CONNECTION) private readonly redis: Redis) {}

  async getActiveAircrafts(): Promise<any> {
    const keys = await this.redis.keys('yasas:aircraft:*');
    const pipeline = this.redis.pipeline();

    for (const key of keys) {
      pipeline.hgetall(key);
    }

    const result = await pipeline.exec();

    return result.map(([err, data]) => data);
  }
}
