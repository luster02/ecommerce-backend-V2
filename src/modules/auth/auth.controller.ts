import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async signup(@Body() signupDto: SignupDto): Promise<{ ok: boolean, data: any }> {
        await this._authService.signup(signupDto)
        return { ok: true, data: 'user created' }
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    @HttpCode(200)
    async signin(@Body() signinDto: SigninDto): Promise<{ ok: boolean, data: any }> {
        const token = await this._authService.signin(signinDto)
        return { ok: true, data: token }
    }
}
