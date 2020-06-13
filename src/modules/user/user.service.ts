import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repositry';
import { User } from './user.entity'
import { UserDetails } from './user.detail.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
    ) { }


    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }
        const user: User = await this._userRepository.findOne(id, { where: { status: 'ACTIVE' } })
        if (!user) {
            throw new NotFoundException();
        }

        return user
    }

    async getAll(): Promise<User[]> {
        const users: User[] = await this._userRepository.find({ where: { status: 'ACTIVE' } })
        if (!users) {
            throw new NotFoundException();
        }
        return users
    }

    async create(UaserData: User): Promise<User> {
        const details = new UserDetails();
        UaserData.details = details
        const repo = await getConnection().getRepository(Role)
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } })
        UaserData.roles = [defaultRole]
        const user: User = await this._userRepository.save(UaserData)
        if (!user) {
            throw new NotFoundException();
        }
        return user
    }

    async update(id: number, userData: User): Promise<void> {
        const user: User = await this._userRepository.findOne(id, { where: { status: 'ACTIVE' } })
        if (!user) {
            throw new NotFoundException();
        }
        await this._userRepository.update(id, userData)
    }

    async delete(id: number): Promise<void> {
        const userExist = await this._userRepository.findOne(id, { where: { status: 'ACTIVE' } })
        if (!userExist) {
            throw new NotFoundException();
        }
        await this._userRepository.update(id, { status: 'INACTIVE' })
    }
}
