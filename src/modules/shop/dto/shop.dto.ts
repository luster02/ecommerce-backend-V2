import { IsNotEmpty } from 'class-validator'
import { Product } from '../../products/product.entity'

export class ShopDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    status: string

    products: Product[]
}