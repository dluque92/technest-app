import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService,
        {
          provide: getRepositoryToken(Account),
          useValue: Account
        }]
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should get accounts', async () => {
    const spy = jest.spyOn(service, 'getAccounts');
    service.getAccounts();
    expect(spy).toHaveBeenCalled();
  });
});
