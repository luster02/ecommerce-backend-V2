import { ProductRepository } from '../products.repository';

describe('Products', () => {
  it('should be defined', () => {
    expect(new ProductRepository()).toBeDefined();
  });
});
