import { Global, Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/providers/data-source.provider';

@Global()
@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})
export class DatabaseModule {}
