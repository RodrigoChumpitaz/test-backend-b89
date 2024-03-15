import { Role } from './user-list-result';

export interface UserOneResultApplication {
    id: string;
    name: string;
    email: string;
    roles: Role[];
    token: string;
    refreshToken: string;
    active: boolean;
    createdAt: Date;
    updateAt: Date;
    createdBy: string;
    updatedBy: string;
    disabledAt: null;
}
