import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CONNECTION } from '../../../common/constants';
import { Redis } from 'ioredis';
import { RedisService } from '../../../common/redis/redis.service';
import { AirborneVelocityDto } from '../dto/airborne-velocity.dto';

@Injectable()
export class AirborneVelocityHandler {
  constructor(
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
    private readonly redisService: RedisService
  ) {}

  async handle(payload: AirborneVelocityDto): Promise<void> {
    const key = this.redisService.getKeyForAircraft(payload.hexIdent);

    await this.redis
      .pipeline()
      .hmset(key, {
        hexIdent: payload.hexIdent,
        groundSpeed: payload.groundSpeed,
        verticalRate: payload.verticalRate,
        track: payload.track
      })
      .expire(key, 60)
      .exec();
  }
}
