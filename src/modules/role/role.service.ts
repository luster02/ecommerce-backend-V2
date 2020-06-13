import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity'


@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) { }


    async get(id: number): Promise<Role> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }
        const role: Role = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } })
        if (!role) {
            throw new NotFoundException();
        }

        return role
    }

    async getAll(): Promise<Role[]> {
        const roles: Role[] = await this._roleRepository.find({ where: { status: 'ACTIVE' } })
        if (!roles) {
            throw new NotFoundException();
        }
        return roles
    }

    async create(UaserData: Role): Promise<Role> {
        const role: Role = await this._roleRepository.save(UaserData)
        if (!role) {
            throw new NotFoundException();
        }
        return role
    }

    async update(id: number, roleData: Role): Promise<void> {
        const role: Role = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } })
        if (!role) {
            throw new NotFoundException();
        }
        await this._roleRepository.update(id, roleData)
    }

    async delete(id: number): Promise<void> {
        const roleExist = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } })
        if (!roleExist) {
            throw new NotFoundException();
        }
        await this._roleRepository.update(id, { status: 'INACTIVE' })
    }
}
