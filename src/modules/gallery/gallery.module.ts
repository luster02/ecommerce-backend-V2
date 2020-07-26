import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryRepository } from './gallery.repository';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryRepository]), CloudinaryModule],
  providers: [GalleryService],
  controllers: [GalleryController]
})
export class GalleryModule { }
