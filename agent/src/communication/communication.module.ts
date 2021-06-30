import { Module } from '@nestjs/common';
import * as io from 'socket.io-client';
import { CommunicationService } from "./communication.service";
import { CommunicationListener } from "./communication.listener";

const stationLinkProvider = {
  provide: 'STATION_LINK',
  useFactory: () => {
    const socket = io('ws://localhost:4000', {
      transports: ['websocket']
    });

    return socket;
  }
}

@Module({
  providers: [
    stationLinkProvider,
    CommunicationService,
    CommunicationListener
  ],
  exports: [
    CommunicationService
  ]
})
export class CommunicationModule {}
