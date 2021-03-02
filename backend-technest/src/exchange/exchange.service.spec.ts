import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
      imports: [HttpModule]
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should get concurrency', async () => {
    const result = { USD: 132 };

    jest.spyOn(service, 'getCurrentExchange').mockImplementation(async () => result);
    expect(await service.getCurrentExchange()).toBe(result);
  });
});
