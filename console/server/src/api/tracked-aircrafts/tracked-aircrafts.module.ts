import { Module } from '@nestjs/common';
import { TrackedAircraftsController } from './tracked-aircrafts.controller';
import { TrackedAircraftsService } from './tracked-aircrafts.service';
import { RedisModule } from '../../common/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [TrackedAircraftsController],
  providers: [TrackedAircraftsService]
})
export class TrackedAircraftsModule {}
