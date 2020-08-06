import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { ProductRepository } from '../products/products.repository';
import { Cart } from './cart.entity'
import { Product } from '../products/product.entity'

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartRepository)
        private readonly _cartRepository: CartRepository,
        @InjectRepository(ProductRepository)
        private readonly _productRepository: ProductRepository,
    ) { }

    async get(id: number): Promise<Cart> {
        if (!id) throw new BadRequestException('id must be sent');
        const cart: Cart = await this._cartRepository.findOne(id)
        if (!cart) throw new NotFoundException();
        return cart
    }

    async addProduct(idCart: number, idProduct: number) {
        if (!idCart) throw new BadRequestException('id must be sent');
        const cart: Cart = await this._cartRepository.findOne(idCart)
        if (!cart) throw new NotFoundException();
        const productToAdd: Product = await this._productRepository.findOne(idProduct)
        cart.products.push(productToAdd)
        await this._cartRepository.save(cart)
    }

    async pullProduct(idCart: number, idProduct: number): Promise<void> {
        if (!idCart) throw new BadRequestException('id must be sent');
        const cart: Cart = await this._cartRepository.findOne(idCart)
        if (!cart) throw new NotFoundException();
        const productToRemove: Product = await this._productRepository.findOne(idProduct)
        cart.products = cart.products.filter(product => { product.id !== productToRemove.id })
        await this._cartRepository.save(cart)
    }
}
