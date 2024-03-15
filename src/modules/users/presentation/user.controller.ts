import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserApplication } from '../application/user.application';
import { UserCreateDto } from './dto/user-create.dto';
import { UserFactory } from '../domain/user.factory';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { RoleGuard } from 'src/modules/auth/guard/role.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { PublicAccess } from 'src/core/decorators/public.decorator';

@Controller('api/v1/user')
@UseGuards(AuthGuard, RoleGuard)
export class UserController {
    constructor(private readonly userApplication: UserApplication) {}

    /**
     * @decorator {string} @PublicAccess()
     * @returns {UserEntity[] | ErrorManager}
     */
    @PublicAccess()
    @Get('/get')
    async getAllUsers() {
        return await this.userApplication.getAllUsers();
    }

    /**
     * @decorator {string} @PublicAccess()
     * @decorator {string} @Get('/get/:id')
     * @param {string} id
     * @returns {UserEntity | ErrorManager}
     */
    @PublicAccess()
    @Get('/get/:id')
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userApplication.getUserById(id);
    }

    /**
     * @decorator {string} @PublicAccess()
     * @decorator {string} @Post('/create')
     * @param {UserCreateDto} user
     * @returns {UserEntity | ErrorManager}
     */
    @PublicAccess()
    @Post('/create')
    async createUser(@Body() user: UserCreateDto) {
        const userFactory = UserFactory.create(user);
        return await this.userApplication.createUser(userFactory as unknown as UserCreateDto);
    }

    /**
     * @decorator {string} @Roles('admin', 'creator', 'moderator')
     * @decorator {string} @Patch('/update/:id')
     * @param {string} id
     * @param {UserCreateDto} user
     * @returns {UserEntity | ErrorManager}
     */
    @Roles('admin', 'creator', 'moderator')
    @Patch('/update/:id')
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UserCreateDto) {
        const userFactory = UserFactory.create(user);
        return await this.userApplication.updateUser(id, userFactory as unknown as UserCreateDto);
    }

    /**
     * @decorator {string} @Roles('admin', 'creator', 'moderator')
     * @decorator {string} @Delete('/delete/:id')
     * @param {string} id
     * @returns {string | ErrorManager}
     */
    @Roles('admin', 'creator', 'moderator')
    @Delete('/delete/:id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userApplication.deleteUser(id);
    }

    /**
     * @decorator {string} @Roles('admin', 'creator', 'moderator')
     * @decorator {string} @Patch('/disable/:id')
     * @param {string} id
     * @returns {UserEntity | ErrorManager}
     */
    @Roles('admin', 'creator', 'moderator')
    @Patch('/disable/:id')
    async disableUser(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userApplication.disableUser(id);
    }
}
