import { Inject, Injectable } from '@nestjs/common';
import { AirToAirDto } from '../dto/air-to-air.dto';
import { REDIS_CONNECTION } from '../../../common/constants';
import { Redis } from 'ioredis';
import { RedisService } from '../../../common/redis/redis.service';

@Injectable()
export class AirToAirHandler {
  constructor(
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
    private readonly redisService: RedisService
  ) {}

  async handle(payload: AirToAirDto): Promise<void> {
    const key = this.redisService.getKeyForAircraft(payload.hexIdent);

    await this.redis
      .pipeline()
      .hmset(key, {
        hexIdent: payload.hexIdent,
        altitude: payload.altitude
      })
      .expire(key, 60)
      .exec();
  }
}
