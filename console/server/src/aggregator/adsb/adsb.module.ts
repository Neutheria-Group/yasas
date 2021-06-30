import { Module } from '@nestjs/common';
import { AdsbGateway } from './adsb.gateway';
import { AdsbHandler } from './adsb.handler';
import { RedisModule } from '../../common/redis/redis.module';
import { AirToAirHandler } from './handler/air-to-air.handler';
import { AirbornePositionHandler } from './handler/airborne-position.handler';
import { AirborneVelocityHandler } from "./handler/airborne-velocity.handler";

@Module({
  imports: [RedisModule],
  providers: [
    AdsbGateway,
    AdsbHandler,
    AirToAirHandler,
    AirbornePositionHandler,
    AirborneVelocityHandler
  ]
})
export class AdsbModule {}
