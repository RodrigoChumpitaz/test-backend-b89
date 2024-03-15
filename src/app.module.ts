import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development', '.env.production']
        }),
        ProductsModule,
        AuthModule,
        UsersModule,
        RolesModule,
        DatabaseModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
