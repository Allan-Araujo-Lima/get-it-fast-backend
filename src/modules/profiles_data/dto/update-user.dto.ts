import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDataDto } from './create-user.dto';

export class UpdateProfileDataDto extends PartialType(CreateProfileDataDto) {}
