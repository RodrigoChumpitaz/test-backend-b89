export interface UserListResultApplication {
    active: boolean;
    createdAt: Date;
    updateAt: Date;
    createdBy: string;
    updatedBy: string;
    disabledAt: null;
    id: string;
    name: string;
    email: string;
    roles: Role[];
    token: string;
    refreshToken: string;
}

export interface Role {
    id: number;
    name: string;
}
