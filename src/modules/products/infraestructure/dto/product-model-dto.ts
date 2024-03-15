import { ProductListResultOrigin } from 'src/core/types/_products';
import { ProductEntity } from '../model/product.entity';
import { converToType } from 'src/core/helpers/mapper';
import { ProductListResultApplication } from '../../application/results/product-list-result';

export class ProductModelDto {
    static fromDataToApplicationList(product: ProductEntity[]): ProductListResultApplication[] {
        const _result: ProductListResultApplication[] = converToType(product, ProductListResultOrigin);
        return _result.map((product: ProductListResultApplication) => {
            return {
                id: product.id,
                productName: product.productName,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                active: product.active,
                createdAt: product.createdAt,
                updateAt: product.updateAt,
                createdBy: product.createdBy,
                updatedBy: product.updatedBy,
                disabledAt: product.disabledAt
            };
        });
    }

    static fromDataToapplicationOne(product: ProductEntity): ProductListResultApplication {
        const _result: ProductListResultApplication = converToType(product, ProductListResultOrigin);
        return {
            id: _result.id,
            productName: _result.productName,
            description: _result.description,
            price: _result.price,
            stock: _result.stock,
            category: _result.category,
            active: _result.active,
            createdAt: _result.createdAt,
            updateAt: _result.updateAt,
            createdBy: _result.createdBy,
            updatedBy: _result.updatedBy,
            disabledAt: _result.disabledAt
        };
    }
}
