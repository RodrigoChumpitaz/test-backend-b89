import { Module } from '@nestjs/common';
import { UserService } from './infraestructure/services/user.service';
import { userProviders } from './infraestructure/model/user.provider';
import { UserController } from './presentation/user.controller';
import { UserApplication } from './application/user.application';
import { roleProviders } from '../roles/infraestructure/model/role.provider';

@Module({
    providers: [UserApplication, UserService, ...userProviders, ...roleProviders],
    exports: [UserService],
    controllers: [UserController]
})
export class UsersModule {}
