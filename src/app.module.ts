import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { ProfilesDataModule } from './modules/profiles_data/profiles_data.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ProfilesDataModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        FRONTEND_URL: Joi.string(),
      }),
    }),
    ProductsModule,
  ],
})
export class AppModule { }
