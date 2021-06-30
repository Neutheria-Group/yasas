import { CacheModule, Module } from "@nestjs/common";
import { ADSBModule } from "./adsb/adsb.module";
import { CommunicationModule } from './communication/communication.module';
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    EventEmitterModule.forRoot({
      delimiter: '/'
    }),
    CacheModule.register(),
    ADSBModule,
    CommunicationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
