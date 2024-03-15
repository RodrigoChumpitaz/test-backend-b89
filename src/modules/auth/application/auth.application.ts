import { Injectable } from '@nestjs/common';
import { AuthService } from '../infraestructure/services/auth.service';
import { ErrorManager } from 'src/core/utils/error.manager';

@Injectable()
export class AuthApplication {
    constructor(private readonly authRepository: AuthService) {}

    async login(email: string, password: string) {
        return this.authRepository.login(email, password).catch((error: ErrorManager) => {
            throw error;
        });
    }
    async recoverPassword(email: string, password: string, tokenRecover: string) {
        return this.authRepository.recoverPassword(email, password, tokenRecover).catch((error: ErrorManager) => {
            throw error;
        });
    }
}
