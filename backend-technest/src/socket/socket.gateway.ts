import { 
    WebSocketServer,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ExchangeService } from '../exchange/exchange.service';
import { AccountService } from 'src/account/account.service';

@WebSocketGateway(3001)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
    server: Server;

    private intervalCurrentExchange: NodeJS.Timeout;
    private intervalAccountBalance: NodeJS.Timeout;
    private logger: Logger = new Logger('AppGateway');

    constructor(
        private accountService: AccountService,
        private exchangeService: ExchangeService
    ) {}

    handleConnection(client: Socket){
        this.logger.log(`Client connected: ${client.id}`);
        this.initIntervalCurrentExchange(client);
        this.initIntervalAccountBalance(client);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        clearInterval(this.intervalCurrentExchange);
        clearInterval(this.intervalAccountBalance);
    }

    private initIntervalCurrentExchange(client: Socket): void {
        this.intervalCurrentExchange = setInterval(async () => {
            const currentExchange = await this.exchangeService.getRandomCurrentExchange();

            client.emit('exchange', { ...currentExchange });
        }, 30000);
    }

    private initIntervalAccountBalance(client: Socket): void {
        this.intervalAccountBalance = setInterval(async () => {
            const account = await this.accountService.getRandomAccountBalance();

            client.emit('balance', { ...account });
        }, 20000);
    }
}