import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule, Module } from '@nestjs/common';

import { ExchangeService } from './exchange.service';
import { ExchangeResolver } from './exchange.resolver';
import { Exchange } from './exchange.entity';
import { ExchangeGateway } from './exchange.gateway';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Exchange])
  ],
  providers: [ExchangeService, ExchangeResolver, ExchangeGateway]
})
export class ExchangeModule {}
