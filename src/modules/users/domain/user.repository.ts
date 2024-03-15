import { UserListResultApp, UserResultOne } from 'src/core/types';
import { UserCreateDto } from '../presentation/dto/user-create.dto';
import { ErrorManager } from 'src/core/utils/error.manager';
import { UserEntity } from '../infraestructure/model/user.entity';

export interface UserRepository {
    /**
     * @returns {UserEntity[] | ErrorManager}
     * @throws {ErrorManager}
     */
    getAllUsers(): Promise<UserListResultApp | ErrorManager>;

    /**
     * @param {string} id
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    getUserById(id: string): Promise<UserResultOne | ErrorManager>;

    /**
     * @param {UserCreateDto} user
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    createUser(user: UserCreateDto): Promise<UserResultOne | ErrorManager>;

    /**
     * @param {string} id
     * @param {UserCreateDto} user
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    updateUser(id: string, user: UserCreateDto): Promise<UserResultOne | ErrorManager>;

    /**
     * @param {string} id
     * @returns {UserEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    disableUser(id: string): Promise<UserResultOne | ErrorManager>;

    /**
     * @param {string} id
     * @returns {string | ErrorManager}
     * @throws {ErrorManager}
     */
    deleteUser(id: string): Promise<string | ErrorManager>;

    /**
     * @param {string} email
     * @returns {UserEntity}
     * @throws {ErrorManager}
     */
    getUserByEmail(email: string): Promise<UserEntity>;
}
