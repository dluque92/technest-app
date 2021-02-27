import { Query, Resolver } from '@nestjs/graphql';

import { ExchangeType } from './exchange.type';
import { ExchangeService } from './exchange.service';

@Resolver(of => ExchangeType)
export class ExchangeResolver {
    constructor(
        private exchangeService: ExchangeService
    ) {}

    @Query(returns => ExchangeType)
    exchange() {
        return this.exchangeService.getCurrentExchange();
    }
}
