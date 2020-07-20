import { Controller, Get, Param, Post, Body, Delete, ParseIntPipe, Patch, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user.detail.entity';
import { CustomResponse } from '../../interfaces/Response.interface';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Get(':id')
    @HttpCode(200)
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const user = await this._userService.get(id)
        return { ok: true, data: user }
    }

    @Get()
    @HttpCode(200)
    async getAllUsers(): Promise<CustomResponse> {
        const users = await this._userService.getAll()
        return { ok: true, data: users }
    }

    @Patch(':id')
    @HttpCode(200)
    async editUser(@Param('id', ParseIntPipe) id: number, @Body() body: UserDetails): Promise<CustomResponse> {
        await this._userService.update(id, body)
        return { ok: true, data: 'updated' }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._userService.delete(id)
        return { ok: true, data: 'deleted' }
    }

}
