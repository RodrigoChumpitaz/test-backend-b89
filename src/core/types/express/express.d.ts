declare module 'express' {
    interface Request {
        idUser: string;
        rolesUser: string[];
        [key: string]: any;
    }
}
