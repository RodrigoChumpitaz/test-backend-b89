import { AuthTokenResponse, IUseToken } from '../types';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
    try {
        const decode = jwt.decode(token) as AuthTokenResponse;

        const currentDate = new Date();
        const expiredDate = new Date(decode.exp);
        return {
            sub: decode.sub,
            role: decode.role,
            isExpired: +expiredDate <= +currentDate / 1000
        };
    } catch (error) {
        // throw ErrorManager.createSignatureError(error.message);
        return 'Token is invalid';
    }
};
