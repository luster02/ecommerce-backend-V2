import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider'
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '../config/config.module'

@Module({
    imports: [ConfigModule],
    providers: [CloudinaryService, CloudinaryProvider],
    exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule { }
