import { JwtModule } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { ProfilesDataModule } from '../profiles_data/profiles_data.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ProfilesDataModule,
    JwtModule.register({
      global: true,
      secret: String(process.env.SECRET_KEY),
      signOptions: { expiresIn: '28800s' }, //one day = 28800s
    }),
  ],
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
