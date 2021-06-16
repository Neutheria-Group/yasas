import { Controller, ForbiddenException, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('/whoami')
  async whoAmI(): Promise<void> {
    throw new ForbiddenException('Unimplemented yet');
  }
}
