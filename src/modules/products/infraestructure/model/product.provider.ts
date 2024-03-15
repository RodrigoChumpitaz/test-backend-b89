import { ProductEntity } from './product.entity';
import { DataSource } from 'typeorm';

export const productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
        inject: [`DATA_SOURCE`]
    }
];
