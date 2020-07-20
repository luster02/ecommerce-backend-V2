import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repositry';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDetailRepositry } from './user.detail.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, UserDetailRepositry])],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule { }
