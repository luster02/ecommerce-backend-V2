import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './products.repository'
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { AssetRepository } from '../asset/asset.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, AssetRepository])],
  providers: [ProductService],
  controllers: [ProductsController]
})
export class ProductsModule { }
