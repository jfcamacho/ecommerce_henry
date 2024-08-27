import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv"
import { registerAs } from "@nestjs/config";

config({path: '.env.development'})

const db_config = {
    type: 'postgres',
    database: process.env.db_name,
    host: process.env.db_host,
    port: process.env.db_port as unknown as number,
    username: process.env.db_username,
    password: process.env.db_password,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    entities: ['dist/**/entities/*.entity.{ts,js}'],
    migrations: ['dist/migrations/*.{js,ts}'],
}

export default registerAs('typeorm', () => db_config)

export const connectionSource = new DataSource(db_config as DataSourceOptions)

