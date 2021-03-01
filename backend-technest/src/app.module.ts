import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './account/account.entity';
import { Exchange } from './exchange/exchange.entity';
import { AccountModule } from './account/account.module';
import { ExchangeModule } from './exchange/exchange.module';
import { SocketModule } from './socket/socket.module';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/account',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Account,
        Exchange,
        Transaction
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    AccountModule,
    ExchangeModule,
    SocketModule,
    TransactionModule
  ]
})
export class AppModule { }
