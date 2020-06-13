import { Controller, Get, Param, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
    constructor(private readonly _roleService: RoleService) { }

    @Get(':id')
    async getRole(@Param('id', ParseIntPipe) id: number) {
        const role = await this._roleService.get(id)
        return { ok: true, data: role }
    }

    @Get()
    async getAllRoles() {
        const roles = await this._roleService.getAll()
        return { ok: true, data: roles }
    }

    @Post('')
    async createRole(@Body() body: Role) {
        const role = await this._roleService.create(body)
        return { ok: true, data: role }
    }

    @Post(':id')
    async editRole(@Param('id', ParseIntPipe) id: number, @Body() body: Role) {
        await this._roleService.update(id, body)
        return { ok: true, data: 'updated' }
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id: number) {
        await this._roleService.delete(id)
        return { ok: true, data: 'deleted' }
    }

}
