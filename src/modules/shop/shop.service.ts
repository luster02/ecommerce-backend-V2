import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repository'
import { Shop } from './shop.entity';
import { ShopDto } from './dto/shop.dto';
import { StatusType } from '../../shared/statustype.enum';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(ShopRepository)
        private readonly _shopRepository: ShopRepository
    ) { }

    async get(id: number): Promise<Shop> {
        if (!id) throw new BadRequestException('id must be sent');
        const shop: Shop = await this._shopRepository.findOne(id)
        if (!shop) throw new NotFoundException();
        return shop
    }

    async getAll(): Promise<Shop[]> {
        const shops: Shop[] = await this._shopRepository.find({ where: { status: StatusType.ACTIVE } })
        if (!shops) throw new NotFoundException();
        return shops
    }

    async update(id: number, shopData: ShopDto): Promise<void> {
        const shop: Shop = await this._shopRepository.findOne(id)
        if (!shop) throw new NotFoundException();
        await this._shopRepository.update(id, shopData)
    }

    async delete(id: number): Promise<void> {
        const shopExist = await this._shopRepository.findOne(id)
        if (!shopExist) throw new NotFoundException();
        await this._shopRepository.delete(id)
    }
}
