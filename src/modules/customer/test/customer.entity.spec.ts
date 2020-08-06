import { CustomerEntity } from '../customer.entity';

describe('Entity', () => {
  it('should be defined', () => {
    expect(new CustomerEntity()).toBeDefined();
  });
});
