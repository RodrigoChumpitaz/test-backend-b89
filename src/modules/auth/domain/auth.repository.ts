export interface AuthRepository {
    login(email: string, password: string): Promise<string>;
    recoverPassword(email: string, password: string, tokenRecover: string): Promise<any>;
}
