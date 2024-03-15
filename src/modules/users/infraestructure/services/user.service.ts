import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { ErrorManager } from 'src/core/utils/error.manager';
import { UserCreateDto } from '../../presentation/dto/user-create.dto';
import { RoleEntity } from 'src/modules/roles/infraestructure/model/role.entity';
import { UserListResultApp, UserResultOne } from 'src/core/types';
import { UserModelDto } from '../dto/user-model-dto';

export type _UserListResult = UserListResultApp | ErrorManager;
export type _UserResultOne = UserResultOne | ErrorManager;

@Injectable()
export class UserService implements UserRepository {
    constructor(
        @Inject('USER_REPOSITORY') private readonly userRepository: Repository<UserEntity>,
        @Inject('ROLE_REPOSITORY') private readonly roleRepository: Repository<RoleEntity>
    ) {}

    /**
     * @returns {UserEntity[] | ErrorManager}
     */
    async getAllUsers(): Promise<_UserListResult> {
        try {
            return UserModelDto.fromDataToApplicationList(await this.userRepository.find());
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {string} id
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    async getUserById(id: string): Promise<_UserResultOne> {
        try {
            const _user = await this.userRepository.findOne({
                where: { id }
            });

            if (!_user) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'User not found'
                });
            }

            return UserModelDto.fromDataToapplicationOne(_user);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {UserCreateDto} user
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    async createUser(user: UserCreateDto): Promise<_UserResultOne> {
        try {
            const newUser: UserEntity = this.userRepository.create({
                email: user.email,
                password: user.password,
                name: user.name,
                roles: user.roles as any,
                token: user.token
            });

            if (!user.roles) {
                newUser.roles = [await this.roleRepository.findOne({ where: { name: 'user' } })];
            } else {
                const roles = await this.roleRepository.findBy({
                    id: In(user.roles)
                });
                newUser.roles = roles;
            }
            return UserModelDto.fromDataToapplicationOne(await this.userRepository.save(newUser));
        } catch (error) {
            const err = new ErrorManager({
                type: 'CONFLICT',
                message: error.message
            });
            console.log(err);
            throw ErrorManager.createSignatureError(err.message);
        }
    }

    /**
     * @param {string} id
     * @param {UserCreateDto} user
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    async updateUser(id: string, user: UserCreateDto): Promise<_UserResultOne> {
        try {
            const repeatEmail = await this.userRepository.findOne({
                where: { email: user.email }
            });

            if (repeatEmail && repeatEmail.id !== id) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Email already exists'
                });
            }

            const existingUser = await this.userRepository.findOne({ where: { id } });

            if (!existingUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'User not found'
                });
            }

            existingUser.email = user.email;
            existingUser.password = user.password;
            existingUser.name = user.name;
            existingUser.updateAt = new Date();

            if (user.roles && user.roles.length > 0) {
                const roles = await this.roleRepository.findBy({ id: In(user.roles) });
                existingUser.roles = roles;
            }

            return UserModelDto.fromDataToapplicationOne(await this.userRepository.save(existingUser));
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {string} id
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    async disableUser(id: string): Promise<_UserResultOne> {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { id }
            });

            if (!existingUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'User not found'
                });
            }

            existingUser.active = false;
            existingUser.disabledAt = new Date();

            return UserModelDto.fromDataToapplicationOne(await this.userRepository.save(existingUser));
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {string} id
     * @returns {string | ErrorManager}
     * @throws {ErrorManager}
     */
    async deleteUser(id: string): Promise<string | ErrorManager> {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { id }
            });

            if (!existingUser) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'User not found'
                });
            }

            await this.userRepository.remove(existingUser);
            return 'User deleted successfully';
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {string} email
     * @returns {UserEntity}
     * @throws {ErrorManager}
     */
    async getUserByEmail(email: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOne({
                where: { email }
            });
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
