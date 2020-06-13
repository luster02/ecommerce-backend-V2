import { Controller, Get, Param, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        const user = await this._userService.get(id)
        return { ok: true, data: user }
    }

    @Get()
    async getAllUsers() {
        const users = await this._userService.getAll()
        return { ok: true, data: users }
    }

    @Post('')
    async createUser(@Body() body: User) {
        const user = await this._userService.create(body)
        return { ok: true, data: user }
    }

    @Post(':id')
    async editUser(@Param('id', ParseIntPipe) id: number, @Body() body: User) {
        await this._userService.update(id, body)
        return { ok: true, data: 'updated' }
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this._userService.delete(id)
        return { ok: true, data: 'deleted' }
    }

}
