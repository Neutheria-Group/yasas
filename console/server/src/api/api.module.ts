import { Module } from '@nestjs/common';
import { TrackedAircraftsModule } from './tracked-aircrafts/tracked-aircrafts.module';
import { RedisModule } from '../common/redis/redis.module';

@Module({
  imports: [TrackedAircraftsModule, RedisModule]
})
export class ApiModule {}
