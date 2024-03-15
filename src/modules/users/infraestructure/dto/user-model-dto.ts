import { converToType } from 'src/core/helpers/mapper';
import { UserListResultApplication } from '../../application/results/user-list-result';
import { UserEntity } from '../model/user.entity';
import { UserListResultOrigin } from '../../../../core/types/_user';

export class UserModelDto {
    static fromDataToApplicationList(users: UserEntity[]): UserListResultApplication[] {
        const _result: UserListResultApplication[] = converToType(users, UserListResultOrigin);
        return _result.map((user: UserListResultApplication) => {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: user.roles,
                token: user.token,
                refreshToken: user.refreshToken,
                active: user.active,
                createdAt: user.createdAt,
                updateAt: user.updateAt,
                createdBy: user.createdBy,
                updatedBy: user.updatedBy,
                disabledAt: user.disabledAt
            };
        });
    }

    static fromDataToapplicationOne(user: UserEntity): UserListResultApplication {
        const _result: UserListResultApplication = converToType(user, UserListResultOrigin);
        return {
            id: _result.id,
            email: _result.email,
            name: _result.name,
            roles: _result.roles,
            token: _result.token,
            refreshToken: _result.refreshToken,
            active: _result.active,
            createdAt: _result.createdAt,
            updateAt: _result.updateAt,
            createdBy: _result.createdBy,
            updatedBy: _result.updatedBy,
            disabledAt: _result.disabledAt
        };
    }
}
