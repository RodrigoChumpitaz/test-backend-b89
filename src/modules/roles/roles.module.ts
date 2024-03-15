import { Module } from '@nestjs/common';
import { RoleService } from './infraestructure/services/role.service';
import { roleProviders } from './infraestructure/model/role.provider';
import { RoleController } from './presentation/role.controller';
import { userProviders } from '../users/infraestructure/model/user.provider';

@Module({
    providers: [RoleService, ...roleProviders, ...userProviders],
    exports: [RoleService],
    controllers: [RoleController]
})
export class RolesModule {}
