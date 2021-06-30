import { Inject, Injectable } from '@nestjs/common';
import { cpus } from 'os';
import { worker } from 'cluster';
import { ADSB_SUBSCRIBER, REDIS_CONNECTION } from '../../common/constants';
import { RedisClient } from 'redis';
import { AirToAirHandler } from './handler/air-to-air.handler';
import { AirbornePositionHandler } from './handler/airborne-position.handler';
import { AirborneVelocityHandler } from './handler/airborne-velocity.handler';

@Injectable()
export class AdsbHandler {
  constructor(
    @Inject(ADSB_SUBSCRIBER) private readonly adsbSubscriber: RedisClient,
    @Inject(REDIS_CONNECTION) private readonly redis: RedisClient,
    private readonly airToAirHandler: AirToAirHandler,
    private readonly airbornePositionHandler: AirbornePositionHandler,
    private readonly airborneVelocityHandler: AirborneVelocityHandler
  ) {
    this.adsbSubscriber.on('message', async (channel, data) => {
      const { opcode, payload } = JSON.parse(data);

      await this.process(opcode, payload);
    });
  }

  async handle(opcode: string, payload: any): Promise<void> {
    const hexIdent = parseInt(payload.hexIdent, 16);
    const aircraftTrackedByWorkerId =
      (hexIdent % parseInt(process.env.AGGREGATOR_PROCESS_COUNT)) + 1;

    if (aircraftTrackedByWorkerId === worker.id) {
      await this.process(opcode, payload);
    } else {
      await this.redis.publish(
        'adsb#' + aircraftTrackedByWorkerId,
        JSON.stringify({
          opcode: opcode,
          payload: payload
        })
      );
    }
  }

  async process(opcode: string, payload: any): Promise<void> {
    console.log(opcode);
    switch (opcode) {
      case 'AirToAirMessage':
        return this.airToAirHandler.handle(payload);
      case 'AirbornePositionMessage':
        return this.airbornePositionHandler.handle(payload);
      case 'AirborneVelocityMessage':
        return this.airborneVelocityHandler.handle(payload);
      default:
        console.log(opcode);
        break;
    }
  }
}
