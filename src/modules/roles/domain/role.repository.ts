import { RoleListResult } from '../infraestructure/services/role.service';
import { RoleCreateDto } from '../presentation/dto/role-create.dto';

export interface RoleRepository {
    /**
     * @returns {RoleListResult}
     */
    getAllRoles(): Promise<RoleListResult>;

    /**
     * @param {number[]} ids
     * @returns {RoleListResult}
     */
    getInstancesByArrayId(ids: number[]): Promise<RoleListResult>;

    /**
     * @param {RoleCreateDto} role
     * @returns {RoleEntity | ErrorManager}
     */
    createRole(role: RoleCreateDto): Promise<any>;
}
