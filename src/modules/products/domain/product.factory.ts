import { ErrorManager } from 'src/core/utils/error.manager';
import { ProductCreateDto } from '../presentation/dto/product-create.dto';
import { Product } from './product.domain';

export class ProductFactory {
    static createProduct(product: ProductCreateDto): Product {
        try {
            if (product.productName.length < 3) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Product name must have at least 3 characters'
                });
            }
            if (product.price <= 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Price must be greater than 0'
                });
            }

            if (product.category.length < 3) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Category must have at least 3 characters'
                });
            }

            return new Product({
                productName: product.productName,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category
            });
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
