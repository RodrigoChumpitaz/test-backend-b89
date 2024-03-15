import { DataSource } from 'typeorm';
import { Env } from '../env/env';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dbConfig = Env.DbConfig;
            const dataSource = new DataSource({
                type: 'postgres',
                host: dbConfig.host,
                port: dbConfig.port,
                username: dbConfig.user,
                password: dbConfig.password,
                database: dbConfig.database,
                synchronize: dbConfig.synchronize,
                entities: dbConfig.entities
            });
            return dataSource.initialize();
        }
    }
];
