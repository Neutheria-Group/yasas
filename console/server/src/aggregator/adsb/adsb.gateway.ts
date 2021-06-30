import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { AirToAirDto } from './dto/air-to-air.dto';
import { AirbornePositionDto } from './dto/airborne-position.dto';
import { AdsbHandler } from './adsb.handler';
import { AirborneVelocityDto } from './dto/airborne-velocity.dto';

@WebSocketGateway({ transports: ['websocket'] })
export class AdsbGateway {
  constructor(private readonly adsbHandler: AdsbHandler) {}

  @SubscribeMessage('@ADSB/AirToAirMessage')
  async onAirToAirMessage(@MessageBody() payload: AirToAirDto): Promise<any> {
    await this.adsbHandler.handle('AirToAirMessage', payload);
  }

  @SubscribeMessage('@ADSB/AirbornePositionMessage')
  async onAirbornePositionMessage(
    @MessageBody() payload: AirbornePositionDto
  ): Promise<any> {
    await this.adsbHandler.handle('AirbornePositionMessage', payload);
  }

  @SubscribeMessage('@ADSB/AirborneVelocityMessage')
  async onAirborneVelocityMessage(
    @MessageBody() payload: AirborneVelocityDto
  ): Promise<any> {
    await this.adsbHandler.handle('AirborneVelocityMessage', payload);
  }

  @SubscribeMessage('@ADSB/AllCallReplyMessage')
  async onAllCallReplyMessage(@MessageBody() payload): Promise<any> {
    await this.adsbHandler.handle('AllCallReplyMessage', payload);
  }

  @SubscribeMessage('@ADSB/IdentificationCategoryMessage')
  async onIdentificationCategoryMessage(@MessageBody() payload): Promise<any> {
    await this.adsbHandler.handle('IdentificationCategoryMessage', payload);
  }

  @SubscribeMessage('@ADSB/SurfacePositionMessage')
  async onSurfacePositionMessage(@MessageBody() payload): Promise<any> {
    await this.adsbHandler.handle('SurfacePositionMessage', payload);
  }
}
