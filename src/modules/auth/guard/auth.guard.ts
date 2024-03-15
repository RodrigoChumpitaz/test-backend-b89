import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ErrorManager } from '../../../core/utils/error.manager';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/core/constants/key-decorators';
import { useToken } from 'src/core/utils/use.token';
import { IUseToken } from 'src/core/types';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/infraestructure/model/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
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
            const req = context.switchToHttp().getRequest<Request>();
            const token = this.extractTokenFromHeader(req);
            if (!token) {
                throw new ErrorManager({
                    type: 'UNAUTHORIZED',
                    message: 'Token not found'
                });
            }

            const manageToken: IUseToken | string = useToken(token);

            if (typeof manageToken === 'string') {
                throw new ErrorManager({
                    type: 'UNAUTHORIZED',
                    message: manageToken
                });
            }

            if (manageToken.isExpired) {
                throw new ErrorManager({
                    type: 'UNAUTHORIZED',
                    message: 'Token is expired'
                });
            }

            const { sub } = manageToken;
            const user = await this.userService.findOne({
                where: { id: sub }
            });

            if (!user) {
                throw new ErrorManager({
                    type: 'UNAUTHORIZED',
                    message: 'Invalid user'
                });
            }
            req.idUser = user.id;
            req.rolesUser = user.roles.map((role) => role.name);
            // try {
            //     const payload = await this.jwtService.verifyAsync(token, {
            //         secret: jwtConstants.secret
            //     });

            //     request.user = payload;
            // } catch (error) {
            //     throw new ErrorManager({
            //         type: 'UNAUTHORIZED',
            //         message: 'Invalid token'
            //     });
            // }
            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    private extractTokenFromHeader(req: Request): string {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
