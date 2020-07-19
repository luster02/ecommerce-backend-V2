import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UserRepository } from './user.repositry';
import { User } from './user.entity'
import { UserDetails } from './user.detail.entity';
import { Role } from '../role/role.entity';
import { UserDetailRepositry } from './user.detail.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(UserDetailRepositry)
        private readonly _userDetailRepository: UserDetailRepositry
    ) { }

    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }
        const user: User = await this._userRepository.findOne(id)
        if (!user) {
            throw new NotFoundException();
        }

        return user
    }

    async getAll(): Promise<User[]> {
        const users: User[] = await this._userRepository.find()
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

    async update(id: number, userData: UserDetails): Promise<void> {
        const details: UserDetails = await this._userDetailRepository.findOne(id)
        if (!details) {
            throw new NotFoundException();
        }
        await this._userDetailRepository.update(id, userData)
    }

    async delete(id: number): Promise<void> {
        const userExist = await this._userRepository.findOne(id)
        if (!userExist) {
            throw new NotFoundException();
        }
        await this._userRepository.delete(id)
    }
}
