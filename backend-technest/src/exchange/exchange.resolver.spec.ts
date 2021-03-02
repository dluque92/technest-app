import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeResolver } from './exchange.resolver';
import { ExchangeService } from './exchange.service';

describe('ExchangeResolver', () => {
  let resolver: ExchangeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeResolver, ExchangeService],
      imports: [HttpModule]
    }).compile();

    resolver = module.get<ExchangeResolver>(ExchangeResolver);
  });

  it('should be called', () => {
    const spy = jest.spyOn(resolver, 'exchange');

    expect(spy).not.toHaveBeenCalled();
    resolver.exchange();
    expect(spy).toHaveBeenCalled();
  });
});
