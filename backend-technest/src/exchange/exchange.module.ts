import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule, Module } from '@nestjs/common';

import { ExchangeService } from './exchange.service';
import { ExchangeResolver } from './exchange.resolver';
import { Exchange } from './exchange.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Exchange])
  ],
  providers: [ExchangeService, ExchangeResolver],
  exports: [ExchangeService]
})
export class ExchangeModule { }
