  
import { 
    WebSocketServer,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ExchangeService } from './exchange.service';

@WebSocketGateway(3001)
export class ExchangeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
    server: Server;

    private logger: Logger = new Logger('AppGateway');

    constructor(
        private exchangeService: ExchangeService
    ) {}

    handleConnection(client: Socket){
        this.logger.log(`Client connected: ${client.id}`);
        this.initIntervalCurrentExchange(client);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    private initIntervalCurrentExchange(client: Socket): void {
        setInterval(() => {
            client.emit('exchange', { ...this.exchangeService.getRandomCurrentExchange() });
        }, 30000);
    }
}