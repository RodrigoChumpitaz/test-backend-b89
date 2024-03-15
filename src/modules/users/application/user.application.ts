import { Injectable } from '@nestjs/common';
import { UserService } from '../infraestructure/services/user.service';
import { ErrorManager } from 'src/core/utils/error.manager';
import { UserListResultApplication } from './results/user-list-result';
import { UserCreateDto } from '../presentation/dto/user-create.dto';
import { CipherService } from './services/cipher.service';
import { TokenService } from './services/token.service';

export type _UserListResultApp = UserListResultApplication[] | ErrorManager;
export type _UserOneResultApp = UserListResultApplication | ErrorManager;

@Injectable()
export class UserApplication {
    constructor(private readonly userRepository: UserService) {}

    /**
     * @returns {UserListResultApplication[] | ErrorManager}
     * @throws {ErrorManager}
     */
    async getAllUsers(): Promise<_UserListResultApp> {
        return await this.userRepository.getAllUsers().catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {string} id
     * @returns {UserListResultApplication | ErrorManager}
     * @throws {ErrorManager}
     */
    async getUserById(id: string): Promise<_UserOneResultApp> {
        return await this.userRepository.getUserById(id).catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {UserCreateDto} user
     * @returns {UserListResultApplication | ErrorManager}
     * @throws {ErrorManager}
     */
    async createUser(user: UserCreateDto): Promise<_UserOneResultApp> {
        user.password = await CipherService.encrypt(user.password);
        user.token = TokenService.generateToken();
        return await this.userRepository.createUser(user).catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {string} id
     * @param {UserCreateDto} user
     * @returns {UserListResultApplication | ErrorManager}
     * @throws {ErrorManager}
     */
    async updateUser(id: string, user: UserCreateDto): Promise<_UserOneResultApp> {
        if (user.password) {
            user.password = await CipherService.encrypt(user.password);
        }
        return await this.userRepository.updateUser(id, user).catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {string} id
     * @returns {string | ErrorManager}
     * @throws {ErrorManager}
     */
    async deleteUser(id: string): Promise<string | ErrorManager> {
        return await this.userRepository.deleteUser(id).catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {string} id
     * @returns {UserListResultApplication | ErrorManager}
     * @throws {ErrorManager}
     */
    async disableUser(id: string): Promise<_UserOneResultApp> {
        return await this.userRepository.disableUser(id).catch((error: ErrorManager) => {
            throw error;
        });
    }
}
