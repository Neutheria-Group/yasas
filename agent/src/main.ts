import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ADSBFeed } from "./adsb/adsb-feed";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(ADSBFeed);

  appService.receive();
}
bootstrap();
