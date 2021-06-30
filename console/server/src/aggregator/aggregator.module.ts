import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { AdsbModule } from './adsb/adsb.module';

@Module({
  imports: [AgentModule, AdsbModule]
})
export class AggregatorModule {}
