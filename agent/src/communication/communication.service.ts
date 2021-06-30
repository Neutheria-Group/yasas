import { Inject, Injectable } from "@nestjs/common";
import { Message } from "../adsb/message/message";

@Injectable()
export class CommunicationService {
  constructor(
    @Inject('STATION_LINK') private readonly stationLink: any
  ) {}

  async transmit (message: Message): Promise<void> {
    this.stationLink.emit(`@ADSB/${message.constructor.name}`, message);
  }
}