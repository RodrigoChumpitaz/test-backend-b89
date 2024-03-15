import { BaseEntity } from 'src/core/infraestructure/base-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    productName: string;

    @Column({ type: 'varchar', length: 250 })
    description: string;

    @Column({ type: 'float', default: 0 })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'varchar', length: 50 })
    category: string;
}
