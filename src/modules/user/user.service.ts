import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repositry';
import { MapperService } from '../../shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity'
import { UserDetails } from './user.detail.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperservice: MapperService
    ) { }


    async get(id: number): Promise<UserDto> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }
        const user: User = await this._userRepository.findOne(id, { where: { status: 'ACTIVE' } })
        if (!user) {
            throw new NotFoundException();
        }

        return this._mapperservice.map<User, UserDto>(user, new UserDto())
    }

    async getAll(): Promise<UserDto> {
        const users: User[] = await this._userRepository.find({ where: { status: 'ACTIVE' } })
        if (!users) {
            throw new NotFoundException();
        }
        return this._mapperservice.mapCollection<User, UserDto>(users, new UserDto())
    }

    async create(UaserData: User): Promise<UserDto> {
        const details = new UserDetails();
        UaserData.details = details
        const repo = await getConnection().getRepository(Role)
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } })
        UaserData.roles = [defaultRole]
        const user: User = await this._userRepository.save(UaserData)
        if (!user) {
            throw new NotFoundException();
        }
        return this._mapperservice.map<User, UserDto>(user, new UserDto())
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
