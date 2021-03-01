import { Module } from '@nestjs/common';

import { SocketGateway } from './socket.gateway';
import { ExchangeModule } from 'src/exchange/exchange.module';
import { AccountModule } from 'src/account/account.module';

@Module({
    imports: [
        AccountModule,
        ExchangeModule
    ],
    providers: [SocketGateway]
})
export class SocketModule {}
