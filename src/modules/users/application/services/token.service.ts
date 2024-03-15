import { v4 as uuidv4 } from 'uuid';

export class TokenService {
    static generateToken(): string {
        return uuidv4();
    }
}
