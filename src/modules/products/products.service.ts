import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './products.repository';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly _productRepository: ProductRepository
    ) { }

    async get(id: number): Promise<Product> {
        if (!id) throw new BadRequestException('id must be sent');
        const product: Product = await this._productRepository.findOne(id)
        if (!product) throw new NotFoundException();
        return product
    }

    async getAll(id: number): Promise<Product[]> {
        const products: Product[] = await this._productRepository.find({ where: { shop: id } })
        if (!products) throw new NotFoundException();
        return products
    }

    async create(id: number, productData: ProductDto): Promise<Product> {
        if (!id) throw new BadRequestException('shop id must be sent');
        productData.shop = id;
        const product: Product = await this._productRepository.save(productData)
        if (!product) throw new NotFoundException();
        return product
    }

    async update(id: number, productData: ProductDto): Promise<void> {
        if (!id) throw new BadRequestException('shop id must be sent');
        const product: Product = await this._productRepository.findOne(id)
        if (!product) throw new NotFoundException();
        await this._productRepository.update(id, productData)
    }

    async delete(id: number): Promise<void> {
        if (!id) throw new BadRequestException('shop id must be sent');
        const productExist = await this._productRepository.findOne(id)
        if (!productExist) throw new NotFoundException();
        await this._productRepository.delete(id)
    }

}
