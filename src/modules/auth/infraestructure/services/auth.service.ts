import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../domain/auth.repository';
import { ErrorManager } from 'src/core/utils/error.manager';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/infraestructure/model/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CipherService } from 'src/modules/users/application/services/cipher.service';
import { TokenService } from 'src/modules/users/application/services/token.service';

@Injectable()
export class AuthService implements AuthRepository {
    constructor(
        @Inject('USER_REPOSITORY') private readonly userService: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}

    /**
     * @param {string} email
     * @param {string} password
     * @returns {string}
     * @throws {ErrorManager}
     * @memberof AuthService
     */
    async login(email: string, password: string): Promise<string> {
        try {
            const user = await this.userService.findOne({
                where: {
                    email
                }
            });

            if (!user) {
                throw new ErrorManager({
                    type: 'UNAUTHORIZED',
                    message: 'User not found, the email is incorrect'
                });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new ErrorManager({
                    type: 'UNAUTHORIZED',
                    message: 'Password is incorrect'
                });
            }

            const payload = { email: user.email, sub: user.id };
            const token = await this.jwtService.signAsync(payload);
            return token;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {string} email
     * @returns {Promise<any>}
     * @throws {ErrorManager}
     * @memberof AuthService
     */
    async recoverPassword(email: string, password: string, tokenRecover: string): Promise<any> {
        try {
            const userByEmail = await this.userService.findOne({
                where: {
                    email,
                    token: tokenRecover
                }
            });

            if (!userByEmail) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'User not found, the email or token is incorrect'
                });
            }

            userByEmail.password = await CipherService.encrypt(password);
            userByEmail.token = TokenService.generateToken();
            await this.userService.save(userByEmail);
            return {
                message: 'Password updated successfully',
                newToken: userByEmail.token
            };
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
