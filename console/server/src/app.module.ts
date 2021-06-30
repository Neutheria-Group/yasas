import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './common/configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.dev.local',
        '.env.dev',
        '.env.production.local',
        '.env.production',
        '.env.local',
        '.env'
      ],
      load: [configuration]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
