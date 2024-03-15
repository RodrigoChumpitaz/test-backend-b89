import { ErrorManager } from 'src/core/utils/error.manager';
import { ProductCreateDto } from '../presentation/dto/product-create.dto';
import { ProductListResultApp, ProductResultOne } from 'src/core/types';

export interface ProductRepository {
    /**
     * @returns {ProductListResultApp | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     */
    findAll(): Promise<ProductListResultApp | ErrorManager>;

    /**
     * @param {string} id
     * @returns {ProductResultOne | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     */
    findOne(id: string): Promise<ProductResultOne | ErrorManager>;

    /**
     * @param {ProductCreateDto} product
     * @returns {ProductResultOne | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     */
    insertProduct(product: any): Promise<any>;

    /**
     * @param {string} id
     * @param {ProductCreateDto} product
     * @returns {ProductResultOne | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     */
    updateProduct(id: string, product: ProductCreateDto): Promise<ProductResultOne | ErrorManager>;

    /**
     * @param {string} id
     * @returns {string | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     */
    disableProduct(id: string): Promise<string | ErrorManager>;
}
