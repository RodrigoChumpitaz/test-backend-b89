import { Role, UserListResultApplication } from 'src/modules/users/application/results/user-list-result';
import { UserOneResultApplication } from 'src/modules/users/application/results/user-one-result';

export type UserListResultApp = UserListResultApplication[];
export type UserResultOne = UserOneResultApplication;

export class UserListResultOrigin {
    id: string;
    email: string;
    name: string;
    token: string;
    refreshToken: string;
    roles: Role[];
    active: boolean;
    createdAt: Date;
    updateAt: Date;
    createdBy: string;
    updatedBy: string;
    disabledAt: null;
}
