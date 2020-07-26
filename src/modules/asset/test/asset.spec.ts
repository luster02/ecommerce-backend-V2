import { AssetRepository } from '../asset.repository';

describe('Asset', () => {
  it('should be defined', () => {
    expect(new AssetRepository()).toBeDefined();
  });
});
