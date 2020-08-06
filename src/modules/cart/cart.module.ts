import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { ProductRepository } from '../products/products.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository, ProductRepository])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule { }
