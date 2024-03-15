import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/core/constants/key-decorators';
import { ROLES } from 'src/core/constants/roles';
import { ErrorManager } from 'src/core/utils/error.manager';
import { UserEntity } from 'src/modules/users/infraestructure/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        @Inject('USER_REPOSITORY') private readonly userService: Repository<UserEntity>,
        private readonly reflector: Reflector
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
            if (isPublic) {
                return true;
            }

            const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY, context.getHandler());

            const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

            const req = context.switchToHttp().getRequest<Request>();

            const { rolesUser } = req;

            if (!roles || roles === undefined) {
                if (!admin) {
                    return true;
                } else if (admin && rolesUser.includes(ROLES.admin)) {
                    return true;
                } else {
                    throw new ErrorManager({
                        type: 'UNAUTHORIZED',
                        message: 'Invalid user, dont have permission to this action'
                    });
                }
            }

            if (rolesUser.includes(ROLES.admin)) return true;

            const isAuth = roles.some((role) => rolesUser.includes(ROLES[role]));

            if (!isAuth) {
                throw new ErrorManager({
                    type: 'UNAUTHORIZED',
                    message: 'Invalid user, dont have permission to this action'
                });
            }
            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
