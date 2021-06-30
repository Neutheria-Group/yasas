import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Socket, connect } from "net";
import { AdsbBaseStationDecoder } from "./decoder/adsb-base-station.decoder";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class ADSBFeed {
  private socket: Socket;

  constructor(
    private readonly decoder: AdsbBaseStationDecoder,
    private readonly eventEmitter: EventEmitter2
  ) {}

  receive () {
    this.socket = connect(30003, '127.0.0.1');

    this.socket.on('data', async (buffer: Buffer) => {
      const messages = await this.decoder.decode(buffer);

      for (const message of messages) {
        this.eventEmitter.emit('@ADSB/OnMessage', message);
      }
    });
  }
}