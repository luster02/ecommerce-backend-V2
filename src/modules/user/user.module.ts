import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repositry';
import { UserService } from './user.service';
import { SharedModule } from '../../shared/shared.module';
import { UserController } from './user.controller';
import { UserDetailRepositry } from './user.detail.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, UserDetailRepositry]), SharedModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule { }
