import { BaseEntity } from 'src/core/infraestructure/base-entity';
import { RoleEntity } from 'src/modules/roles/infraestructure/model/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 70, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    token: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    refreshToken: string;

    @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
    @JoinTable({
        name: 'user_roles'
    })
    roles: RoleEntity[];
}
