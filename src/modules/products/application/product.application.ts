import { Injectable } from '@nestjs/common';
import { ProductService } from '../infraestructure/services/product.service';
import { ProductCreateDto } from '../presentation/dto/product-create.dto';
import { ErrorManager } from 'src/core/utils/error.manager';
import { ProductListResultApplication } from './results/product-list-result';
import { ProductOneResultApplication } from './results/product-result';

export type _ProductListResultApp = ProductListResultApplication[] | ErrorManager;
export type _ProductResultOneApp = ProductOneResultApplication | ErrorManager;

@Injectable()
export class ProductApplication {
    constructor(private productRepository: ProductService) {}

    /**
     * @returns {ProductListResultApplication[] | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductApplication
     * @method getAllProducts
     * @implements {ProductRepository}
     * @param {void}
     */
    async findAll(): Promise<_ProductListResultApp> {
        return await this.productRepository.findAll().catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {string} id
     * @returns {ProductOneResultApplication | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductApplication
     * @method findOne
     * @implements {ProductRepository}
     */
    async findOne(id: string): Promise<_ProductResultOneApp> {
        return await this.productRepository.findOne(id).catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {ProductCreateDto} product
     * @returns {ProductOneResultApplication | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductApplication
     * @method insertProduct
     * @implements {ProductRepository}
     */
    async insertProduct(product: ProductCreateDto): Promise<_ProductResultOneApp> {
        return await this.productRepository.insertProduct(product).catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {string} id
     * @param {ProductCreateDto} product
     * @returns {ProductOneResultApplication | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductApplication
     * @method updateProduct
     * @implements {ProductRepository}
     */
    async updateProduct(id: string, product: ProductCreateDto): Promise<_ProductResultOneApp> {
        return await this.productRepository.updateProduct(id, product).catch((error: ErrorManager) => {
            throw error;
        });
    }

    /**
     * @param {string} id
     * @returns {string | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductApplication
     * @method disableProduct
     * @implements {ProductRepository}
     */
    async disableProduct(id: string): Promise<string | ErrorManager> {
        return await this.productRepository.disableProduct(id).catch((error: ErrorManager) => {
            throw error;
        });
    }
}
