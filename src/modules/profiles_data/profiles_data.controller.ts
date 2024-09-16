import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Controller,
} from '@nestjs/common';
import { UpdateProfileDataDto } from './dto/update-user.dto';
import { CreateProfileDataDto } from './dto/create-user.dto';
import { ProfilesDataService } from './profiles_data.service';
import { Public } from '../auth/public.decorator';

@Controller('users')
export class ProfilesDataController {
  constructor(private readonly profiles_dataService: ProfilesDataService) { }

  @Public()
  @Post('signup')
  create(@Body() createProfileDataDto: CreateProfileDataDto) {
    return this.profiles_dataService.create(createProfileDataDto);
  }

  @Get()
  findAll() {
    return this.profiles_dataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profiles_dataService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfileDataDto: UpdateProfileDataDto,
  ) {
    return this.profiles_dataService.update(id, updateProfileDataDto);
  }

  @Get('forgot-password/:email')
  sendEmailForgotPassword(@Param('email') id: string) {
    return this.profiles_dataService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profiles_dataService.remove(id);
  }
}
