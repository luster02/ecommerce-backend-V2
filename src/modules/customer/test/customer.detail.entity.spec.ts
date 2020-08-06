import { CustomerDetailEntity } from '../customer.detail.entity';

describe('Details', () => {
  it('should be defined', () => {
    expect(new CustomerDetailEntity()).toBeDefined();
  });
});
