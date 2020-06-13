import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto } from './dto';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletypes.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) { }

    async signup(signupDto: SignupDto): Promise<void> {
        const { username, email } = signupDto
        const userExist = await this._authRepository.findOne({ where: [{ username }, { email }] })
        if (userExist) {
            throw new ConflictException("username or email already exist")

        }
        return this._authRepository.signup(signupDto)
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {
        const { username, password } = signinDto
        const user: User = await this._authRepository.findOne({ where: { username } })
        if (!user) {
            throw new NotFoundException("email or password incorrect")
        }
        const isMatch = await compare(password, user.password)

        if (!isMatch) {
            throw new NotFoundException("email or password incorrect")
        }

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.roles.map(r => r.name as RoleType)
        }

        const token = await this._jwtService.sign(payload)

        return { token }
    }
}
