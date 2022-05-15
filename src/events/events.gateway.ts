import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CompaniesService } from 'src/companies/companies.service';
import { UserService } from 'src/users/user.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private userService: UserService;
  private companiesService: CompaniesService;
  @WebSocketServer() wss: Server;
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  private logger: Logger = new Logger('EventsGateway');
  afterInit(server: Server) {
    console.log('Initialized');
  }
  @SubscribeMessage('eventsToServer')
  handleMessage(client: Socket, message: { room: string; text: string }): void {
    this.wss.to(message.room).emit('eventsToClient', message.text);
  }
  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, userId: number): Promise<void> {
    const companies = await this.companiesService.getCompanieslist(
      userId,
      10,
      1,
    )[1];
    companies.forEach((element) => {
      client.join(element.id.toString());
    });
  }
}