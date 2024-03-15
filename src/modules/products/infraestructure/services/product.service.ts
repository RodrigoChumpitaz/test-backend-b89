import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { ProductEntity } from '../model/product.entity';
import { Repository } from 'typeorm';
import { ProductCreateDto } from '../../presentation/dto/product-create.dto';
import { ErrorManager } from 'src/core/utils/error.manager';
import { ProductListResultApp, ProductResultOne } from 'src/core/types/_products';
import { ProductModelDto } from '../dto/product-model-dto';

export type _ProductListResult = ProductListResultApp | ErrorManager;
export type _ProductResultOne = ProductResultOne | ErrorManager;

@Injectable()
export class ProductService implements ProductRepository {
    constructor(@Inject('PRODUCT_REPOSITORY') private productRepo: Repository<ProductEntity>) {}

    /**
     * @returns {ProductEntity[] | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     * @implements {ProductRepository}
     * @method getAllProducts
     */
    async findAll(): Promise<_ProductListResult> {
        try {
            const _products = await this.productRepo.find({
                where: {
                    active: true
                }
            });
            return ProductModelDto.fromDataToApplicationList(_products);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {string} id
     * @returns {ProductEntity | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     * @implements {ProductRepository}
     * @method findOne
     */
    async findOne(id: string): Promise<_ProductResultOne> {
        try {
            const _productBtId = await this.productRepo.findOne({
                where: {
                    id
                }
            });

            if (!_productBtId) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'Product not found'
                });
            }

            return ProductModelDto.fromDataToapplicationOne(_productBtId);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {ProductCreateDto} product
     * @returns {ProductEntity | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     * @implements {ProductRepository}
     * @method insertProduct
     */
    async insertProduct(product: ProductCreateDto): Promise<_ProductResultOne> {
        try {
            const _product = this.productRepo.create(product);
            return ProductModelDto.fromDataToapplicationOne(await this.productRepo.save(_product));
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {string} id
     * @param {ProductCreateDto} product
     * @returns {ProductEntity | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     * @implements {ProductRepository}
     * @method updateProduct
     */
    async updateProduct(id: string, product: any): Promise<_ProductResultOne> {
        try {
            const _productById: ProductEntity = await this.productRepo.findOne({
                where: {
                    id
                }
            });

            if (!_productById) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'Product not found'
                });
            }

            return ProductModelDto.fromDataToapplicationOne(
                await this.productRepo.save({
                    id: _productById.id,
                    ...product
                })
            );
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /**
     * @param {string} id
     * @returns {string | ErrorManager}
     * @throws {ErrorManager}
     * @memberof ProductService
     * @implements {ProductRepository}
     * @method disableProduct
     */
    async disableProduct(id: string): Promise<string | ErrorManager> {
        try {
            const productById: ProductEntity = await this.productRepo.findOne({
                where: {
                    id
                }
            });

            if (!productById) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'Product not found'
                });
            }

            productById.active = false;
            productById.disabledAt = new Date();
            await this.productRepo.save(productById);
            return `The product with id: ${id} has been disabled successfully`;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
