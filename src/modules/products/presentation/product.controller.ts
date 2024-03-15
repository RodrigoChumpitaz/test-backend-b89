import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductApplication } from '../application/product.application';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductFactory } from '../domain/product.factory';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { PublicAccess } from 'src/core/decorators/public.decorator';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleGuard } from 'src/modules/auth/guard/role.guard';

@Controller('api/v1/product')
@UseGuards(AuthGuard, RoleGuard)
export class ProductController {
    constructor(private readonly productApplication: ProductApplication) {}

    /**
     * @decorator {string} @PublicAccess()
     * @returns {ProductEntity[] | ErrorManager}
     * @throws {ErrorManager}
     */
    @PublicAccess()
    @Get('/get')
    async getAll() {
        return await this.productApplication.findAll();
    }

    /**
     * @decorator {string} @PublicAccess()
     * @decorator {string} @Get('/get/:id')
     * @param {string} id
     * @returns {ProductEntity | ErrorManager}
     */
    @PublicAccess()
    @Get('/get/:id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.productApplication.findOne(id);
    }

    /**
     * @decorator {string} @Roles('admin', 'creator')
     * @decorator {string} @Post('/create')
     * @param {ProductCreateDto} product
     * @returns {ProductEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    @Roles('admin', 'creator')
    @Post('/create')
    async createProduct(@Body() product: ProductCreateDto) {
        const _producFactory = ProductFactory.createProduct(product);
        return await this.productApplication.insertProduct(_producFactory);
    }

    /**
     * @decorator {string} @Roles('admin', 'creator')
     * @decorator {string} @Patch('/update/:id')
     * @param {string} id
     * @param {ProductCreateDto} product
     * @returns {ProductEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    @Roles('admin', 'creator')
    @Patch('/update/:id')
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: ProductCreateDto) {
        const _producFactory = ProductFactory.createProduct(product);
        return await this.productApplication.updateProduct(id, _producFactory);
    }

    /**
     * @decorator {string} @Roles('admin', 'creator')
     * @decorator {string} @Patch('/disable/:id')
     * @param {string} id
     * @returns {ProductEntity | ErrorManager}
     * @throws {ErrorManager}
     */
    @Roles('admin', 'creator')
    @Patch('/disable/:id')
    async disableProduct(@Param('id', ParseUUIDPipe) id: string) {
        return await this.productApplication.disableProduct(id);
    }
}
