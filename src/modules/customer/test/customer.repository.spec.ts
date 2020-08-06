import { CustomerRepository } from '../customer.repository';

describe('Repository', () => {
  it('should be defined', () => {
    expect(new CustomerRepository()).toBeDefined();
  });
});
