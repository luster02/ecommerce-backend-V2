import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { SignupDto, SigninDto } from './dto';
import { User } from '../user/user.entity';
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
        const { email } = signupDto
        const userExist = await this._authRepository.findOne({ where: [{ email }] })
        if (userExist) throw new ConflictException("username or email already exist");
        return await this._authRepository.signup(signupDto)
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {
        const { email, password } = signinDto
        const user: User = await this._authRepository.findOne({ where: { email } })
        if (!user) throw new NotFoundException("email or password incorrect");
        const isMatch = await compare(password, user.password)
        if (!isMatch) throw new BadRequestException("email or password incorrect");

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            role: user.roles.map(r => r.name as RoleType)
        }

        const token = await this._jwtService.sign(payload)

        return { token }
    }
}
