import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../domain/role.repository';
import { In, Repository } from 'typeorm';
import { RoleEntity } from '../model/role.entity';
import { ErrorManager } from 'src/core/utils/error.manager';
import { RoleCreateDto } from '../../presentation/dto/role-create.dto';

export type RoleListResult = RoleEntity[] | ErrorManager;

@Injectable()
export class RoleService implements RoleRepository {
    constructor(@Inject('ROLE_REPOSITORY') private roleRepo: Repository<RoleEntity>) {}

    /**
     * @returns {RoleEntity[] | ErrorManager}
     * @throws {ErrorManager}
     */
    async getAllRoles(): Promise<RoleEntity[]> {
        try {
            const _rolesToInsert = [
                {
                    name: 'admin'
                },
                {
                    name: 'creator'
                },
                {
                    name: 'user'
                }
            ];

            const existRoles = await this.roleRepo.find({
                where: {
                    name: In(_rolesToInsert.map((role) => role.name))
                }
            });

            if (existRoles.length === 0) {
                await this.roleRepo.insert(_rolesToInsert);
            }

            return await this.roleRepo.find();
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {number[]} ids
     * @returns {RoleEntity[] | ErrorManager}
     * @throws {ErrorManager}
     */
    async getInstancesByArrayId(ids: number[]): Promise<RoleEntity[]> {
        try {
            return await this.roleRepo.findBy({
                id: In(ids)
            });
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {RoleCreateDto} role
     * @returns {RoleEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    async createRole(role: RoleCreateDto): Promise<RoleEntity> {
        try {
            const _role = await this.roleRepo.create(role);
            return await this.roleRepo.save(_role);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
