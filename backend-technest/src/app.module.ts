import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './account/account.entity';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/account',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Account
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    AccountModule
  ]
})
export class AppModule {}
