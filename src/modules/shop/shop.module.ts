import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repository'
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository])],
  providers: [ShopService],
  controllers: [ShopController]
})
export class ShopModule { }
