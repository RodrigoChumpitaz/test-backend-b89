import { ErrorManager } from 'src/core/utils/error.manager';
import { UserCreateDto } from '../presentation/dto/user-create.dto';
import { User } from './user.domain';

export class UserFactory {
    static create(user: UserCreateDto): User {
        try {
            if (user.email.length < 10) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Email must have at least 10 characters'
                });
            }

            if (user.password.length < 6) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Password must have at least 6 characters'
                });
            }

            return new User({
                name: user.name,
                email: user.email,
                password: user.password,
                token: user.token,
                roles: user.roles as number[]
            });
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
