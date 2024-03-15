import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleService } from '../infraestructure/services/role.service';
import { RoleCreateDto } from './dto/role-create.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { RoleGuard } from 'src/modules/auth/guard/role.guard';
import { PublicAccess } from 'src/core/decorators/public.decorator';
import { Roles } from 'src/core/decorators/roles.decorator';

@Controller('api/v1/role')
@UseGuards(AuthGuard, RoleGuard)
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    /**
     * @decorator {string} @PublicAccess()
     * @returns {RoleEntity[] | ErrorManager}
     * @throws {ErrorManager}
     */
    @PublicAccess()
    @Get('/get')
    async getRoles() {
        return await this.roleService.getAllRoles();
    }

    /**
     * @decorator {string} @Roles('admin', 'creator')
     * @decorator {string} @Post('/create')
     * @param {RoleCreateDto} role
     * @returns {RoleEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    @Roles('admin', 'creator')
    @Post('/create')
    async createRole(@Body() role: RoleCreateDto) {
        return await this.roleService.createRole(role);
    }
}
