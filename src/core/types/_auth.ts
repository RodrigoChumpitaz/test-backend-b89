import { UserEntity } from 'src/modules/users/infraestructure/model/user.entity';

export type AuthResponse = {
    access_token: string;
    user: UserEntity;
};

export type AuthTokenResponse = {
    role: number | number[];
    sub: string;
    iat: number;
    exp: number;
};

export type IUseToken = {
    role: number | number[];
    sub: string;
    isExpired: boolean;
};
