import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CommunicationService } from "./communication.service";
import { Message } from "../adsb/message/message";

@Injectable()
export class CommunicationListener {
  constructor(
    private readonly communicationService: CommunicationService
  ) {}

  @OnEvent('@ADSB/OnMessage')
  async onMessage (payload: Message) {
    console.log(payload);
    return this.communicationService.transmit(payload);
  }
}