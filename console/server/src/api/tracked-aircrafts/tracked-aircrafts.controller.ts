import { Controller, Get } from '@nestjs/common';
import { TrackedAircraftsService } from './tracked-aircrafts.service';

@Controller('tracked-aircrafts')
export class TrackedAircraftsController {
  constructor(
    private readonly trackedAircraftService: TrackedAircraftsService
  ) {}

  @Get()
  async getTrackedAircrafts(): Promise<any> {
    return this.trackedAircraftService.getActiveAircrafts();
  }
}
