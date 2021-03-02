import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

describe('AccountResolver', () => {
  let resolver: AccountResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountResolver,
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useValue: Account
        }
      ],
    }).compile();

    resolver = module.get<AccountResolver>(AccountResolver);
  });

  it('should be defined', () => {
    const spy = jest.spyOn(resolver, 'account');

    expect(spy).not.toHaveBeenCalled();
    resolver.account('');
    expect(spy).toHaveBeenCalled();
  });
});
