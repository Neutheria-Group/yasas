import { Module } from "@nestjs/common";
import { ADSBFeed } from "./adsb-feed";
import { AdsbBaseStationDecoder } from "./decoder/adsb-base-station.decoder";

@Module({
  providers: [ADSBFeed, AdsbBaseStationDecoder]
})
export class ADSBModule {

}