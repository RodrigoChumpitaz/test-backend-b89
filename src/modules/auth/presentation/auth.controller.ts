import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthApplication } from '../application/auth.application';
import { AuthDto } from './dto/auth.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authApplication: AuthApplication) {}

    /**
     * @decorator {string} @Post('/register')
     * @param {AuthDto} user
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    @Post('/login')
    async login(@Body() { email, password }: AuthDto) {
        return await this.authApplication.login(email, password);
    }

    /**
     * @decorator {string} @Post('/register')
     * @param {AuthDto} user
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    @Patch('/changePassword/:token')
    async recoverPassword(@Body() { email, password }: AuthDto, @Param('token') token: string) {
        return await this.authApplication.recoverPassword(email, password, token);
    }
}
