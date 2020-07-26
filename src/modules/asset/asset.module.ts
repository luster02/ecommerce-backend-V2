import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetRepository } from './asset.repository'
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { GalleryRepository } from '../gallery/gallery.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AssetRepository, GalleryRepository]), CloudinaryModule],
  providers: [AssetService],
  controllers: [AssetController]
})
export class AssetModule { }
