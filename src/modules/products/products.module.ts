import { Module } from '@nestjs/common';
import { ProductService } from './infraestructure/services/product.service';
import { ProductController } from './presentation/product.controller';
import { productProviders } from './infraestructure/model/product.provider';
import { ProductApplication } from './application/product.application';
import { userProviders } from '../users/infraestructure/model/user.provider';

@Module({
    providers: [ProductApplication, ProductService, ...productProviders, ...userProviders],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductsModule {}
