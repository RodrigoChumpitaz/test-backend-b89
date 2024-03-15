import { Column } from 'typeorm';

export class BaseEntity {
    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @Column({ type: 'varchar', length: 50, default: 'system' })
    createdBy: string;

    @Column({ type: 'varchar', length: 50, default: 'system' })
    updatedBy: string;

    @Column({ type: 'timestamp', nullable: true })
    disabledAt: Date | null;
}
