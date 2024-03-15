import { UserEntity } from 'src/modules/users/infraestructure/model/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[];
}
