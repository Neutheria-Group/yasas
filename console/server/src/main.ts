import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { fork, isMaster, isWorker } from 'cluster';
import { ValidationPipe } from '@nestjs/common';
import { AggregatorModule } from './aggregator/aggregator.module';
import { ApiModule } from './api/api.module';

async function bootstrap() {
  if (isMaster) {
    const app = await NestFactory.createApplicationContext(AppModule);
    for (let i = 0; i < parseInt(process.env.AGGREGATOR_PROCESS_COUNT); i++) {
      fork();
    }
  }

  if (isWorker) {
    if (process.argv.indexOf('--aggregator') > 0) {
      await startAggregator();
    }

    if (process.argv.indexOf('--api') > 0) {
      await startApi();
    }

    await startAggregator();
    await startApi();
  }
}

async function startAggregator() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AggregatorModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
}

async function startApi() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
