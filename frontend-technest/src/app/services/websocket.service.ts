import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { CurrentExchange, Account } from '../core/interfaces/common.interface';
import { DataProviderService } from './data-provider.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: SocketIOClient.Socket;

  constructor(
    private dataProviderService: DataProviderService
  ) {
    this.socket = io('http://localhost:3001/');

    this.socket
      .on('exchange', (exchange: CurrentExchange) => this.dataProviderService.currentExchange.next(exchange));

    this.socket
      .on('balance', (account: Account) => this.dataProviderService.account.next(account));
  }
}
