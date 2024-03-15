export interface UserRequireds {
    name: string;
    email: string;
    password: string;
    roles: number[];
}

export interface UserOptionals {
    id: string;
    active: boolean;
    token: string;
    refreshToken: string;
    createdAt: Date;
    updateAt: Date;
    createdBy: string;
    updatedBy: string;
    disabledAt: Date | null;
}

export type UserProperties = UserRequireds & Partial<UserOptionals>;

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    roles: number[];
    token: string;
    refreshToken: string;
    active: boolean;
    createdAt: Date;
    updateAt: Date;
    createdBy: string;
    updatedBy: string;
    disabledAt: Date | null;

    constructor(props: UserProperties) {
        Object.assign(this, props);
        this.active = true;
        this.createdAt = new Date();
        this.updateAt = new Date();
    }
}
