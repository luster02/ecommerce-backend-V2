import { Controller, Get, Param, Post, Body, Delete, ParseIntPipe, HttpCode, Patch } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CustomResponse } from 'src/interfaces/Response.interface';

@Controller('roles')
export class RoleController {
    constructor(private readonly _roleService: RoleService) { }

    @Get(':id')
    @HttpCode(200)
    async getRole(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const role = await this._roleService.get(id)
        return { ok: true, data: role }
    }

    @Get()
    @HttpCode(200)
    async getAllRoles(): Promise<CustomResponse> {
        const roles = await this._roleService.getAll()
        return { ok: true, data: roles }
    }

    @Post('')
    @HttpCode(200)
    async createRole(@Body() body: Role): Promise<CustomResponse> {
        const role = await this._roleService.create(body)
        return { ok: true, data: role }
    }

    @Patch(':id')
    @HttpCode(200)
    async editRole(@Param('id', ParseIntPipe) id: number, @Body() body: Role): Promise<CustomResponse> {
        await this._roleService.update(id, body)
        return { ok: true, data: 'updated' }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._roleService.delete(id)
        return { ok: true, data: 'deleted' }
    }

}
