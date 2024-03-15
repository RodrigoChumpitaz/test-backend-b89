interface DbConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    entities: string[];
    synchronize: boolean;
    logging: boolean;
    ssl: boolean;
}

export class Env {
    static get JwtSecret(): string {
        return process.env.JWT_SECRET;
    }

    static get DbConfig(): DbConfig {
        return {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT),
            entities: [process.env.DB_ENTITIES] as string[],
            synchronize: process.env.DB_SYNCHRONIZE === 'true',
            logging: process.env.DB_LOGGING === 'true',
            ssl: process.env.DB_SSL === 'true'
        };
    }
}
