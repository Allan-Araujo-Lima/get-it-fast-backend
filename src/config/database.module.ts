// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: Number(process.env.PORT),
            host: String(process.env.HOST),
            username: String(process.env.USERNAMEDB),
            password: String(process.env.PASSWORD),
            database: String(process.env.DATABASE),
            synchronize: true,
            ssl: true,
            extra: {
                sslmode: 'require',
            },
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
        }),
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule { }