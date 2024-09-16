import { Module } from '@nestjs/common';
import { ProfilesDataController } from './profiles_data.controller';
import { ProfilesDataService } from './profiles_data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesData } from './repository/index.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfilesData])],
  controllers: [ProfilesDataController],
  providers: [ProfilesDataService],
  exports: [ProfilesDataService],
})
export class ProfilesDataModule {}
