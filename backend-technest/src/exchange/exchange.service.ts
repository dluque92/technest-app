import { HttpService, Injectable } from '@nestjs/common';
import { Exchange } from './exchange.entity';

const CRYPTOCOMPARE_URL = 'https://min-api.cryptocompare.com/data/price';

@Injectable()
export class ExchangeService {
    constructor(
        private http: HttpService
    ){}

    async getCurrentExchange(): Promise<Exchange> {
        const params = {
            fsym: 'BTC',
            tsyms: 'USD',
            api_key: 'b1e73aef92a860de3e95c4f04a974449c87870d3058106a996fb3a2767feec5f'
        };

        try {
            return await this.http.get(CRYPTOCOMPARE_URL, { params })
                .toPromise()
                .then(res => res.data);
        } catch (error) {
            throw error;
        }
    }

    async getRandomCurrentExchange(): Promise<Exchange> {
        // If you want to get REAL current exchange
        // return await this.getCurrentExchange();

        const currentExchange = await this.getCurrentExchange();

        return {
            USD: (Math.random() * (12000 - 5000) + 5000) + currentExchange.USD
        }
    }
}
