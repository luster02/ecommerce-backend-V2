import { Controller, Get, HttpCode, Param, ParseIntPipe, Post, Body, UsePipes, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { ProductService } from './products.service';
import { CustomResponse } from 'src/interfaces/Response.interface';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly _productService: ProductService) { }

    @Get(':id')
    @HttpCode(200)
    async getProduct(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const product = await this._productService.get(id)
        return { ok: true, data: product }
    }

    @Get('/all/:id')
    @HttpCode(200)
    async getAllProducts(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const products = await this._productService.getAll(id)
        return { ok: true, data: products }
    }

    @Post(':id')
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async createProduct(@Param('id', ParseIntPipe) id: number, @Body() productDto: ProductDto): Promise<CustomResponse> {
        const product = await this._productService.create(id, productDto)
        return { ok: true, data: product }
    }

    @Patch(':id')
    @HttpCode(200)
    async editProduct(@Param('id', ParseIntPipe) id: number, @Body() productDto: ProductDto): Promise<CustomResponse> {
        await this._productService.update(id, productDto)
        return { ok: true, data: 'updated' }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._productService.delete(id)
        return { ok: true, data: 'deleted' }
    }
}
