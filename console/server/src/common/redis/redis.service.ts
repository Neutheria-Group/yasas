import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  getKeyForAircraft(hexIdent): string {
    return 'yasas:aircraft:' + hexIdent;
  }
}
