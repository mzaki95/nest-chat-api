import { Injectable } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { MessageReceivedDto } from './dto/message-received.dto';
import { MessageEmitDto } from './dto/message-emit.dto';

@WebSocketGateway()
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  constructor(
    private readonly authService: AuthService,
  ) {}

  private readonly connectedClients: Map<string, {socket: Socket, username: string}> = new Map();

  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    console.log(client.request.headers);

    if (!client.handshake.query || !client.handshake.query.token) {
      client.disconnect(true);
      return
    }

    const user = this.authService.verifyToken(client.handshake.query.token as string);

    if (!user.username) {
      client.disconnect(true);
      return
    }

    this.connectedClients.set(client.id, {socket: client, username: user.username});
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    console.log(client.request.headers)
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: MessageReceivedDto): void {
    console.log(`Received message from ${client.id}: ${payload.content}`);
    console.log(client.request.headers);
    const clientContext = this.connectedClients.get(client.id)
    this.connectedClients.forEach((val) => {
      const test = new MessageEmitDto(1, clientContext.username, payload.content, new Date(), clientContext.username === val.username)
      const theMessage = JSON.stringify(test)
      console.log("themessage", theMessage);
      val.socket.emit('message', theMessage);
    })
  }
}
