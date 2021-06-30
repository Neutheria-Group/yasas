import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CONNECTION } from '../../../common/constants';
import { Redis } from 'ioredis';
import { RedisService } from '../../../common/redis/redis.service';
import { AirbornePositionDto } from '../dto/airborne-position.dto';

@Injectable()
export class AirbornePositionHandler {
  constructor(
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
    private readonly redisService: RedisService
  ) {}

  async handle(payload: AirbornePositionDto): Promise<void> {
    const key = this.redisService.getKeyForAircraft(payload.hexIdent);

    await this.redis
      .pipeline()
      .hmset(key, {
        hexIdent: payload.hexIdent,
        altitude: payload.altitude,
        latitude: payload.latitude,
        longitude: payload.longitude
      })
      .expire(key, 60)
      .exec();
  }
}
