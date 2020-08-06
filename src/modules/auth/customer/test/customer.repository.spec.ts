import { CustomerAuthRepository } from '../customer.auth.repository';

describe('Repository', () => {
  it('should be defined', () => {
    expect(new CustomerAuthRepository()).toBeDefined();
  });
});
