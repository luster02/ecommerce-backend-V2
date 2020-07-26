import { GalleryRepository } from '../gallery.repository';

describe('Gallery', () => {
  it('should be defined', () => {
    expect(new GalleryRepository()).toBeDefined();
  });
});
