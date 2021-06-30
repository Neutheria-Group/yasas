import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { worker } from 'cluster';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ transports: ['websocket'] })
export class AgentGateway implements OnGatewayConnection {
  private logger: Logger = new Logger(AgentGateway.name);

  handleConnection(client: any, ...args: any[]): any {
    this.logger.debug(`Accepted agent connection on worker ${worker.id}.`);
  }
}
