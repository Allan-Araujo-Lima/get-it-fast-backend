import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesData } from './repository/index.entity';
import { CreateProfileDataDto } from './dto/create-user.dto';
import { UpdateProfileDataDto } from './dto/update-user.dto';

@Injectable()
export class ProfilesDataService {
  constructor(
    @InjectRepository(ProfilesData)
    private profile_dataRepository: Repository<ProfilesData>,
  ) { }

  async create(profile_data: CreateProfileDataDto) {
    const verifiedProfileData = await this.findByEmail(profile_data.email);

    if (verifiedProfileData)
      throw new ConflictException(
        'Already exist an profile_data with this email.',
      );

    profile_data.password = bcrypt.hashSync(
      profile_data.password,
      Number(process.env.SALT_PASSWORD),
    );
    await this.profile_dataRepository.save(profile_data);
  }

  findAll() {
    return this.profile_dataRepository.findAndCount();
  }

  async findOneById(id: string): Promise<ProfilesData | undefined> {
    return this.profile_dataRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneWithEmail(email: string): Promise<ProfilesData | undefined> {
    return await this.profile_dataRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password'],
    });
  }

  async findByEmail(email: string): Promise<ProfilesData> {
    return this.profile_dataRepository.findOne({
      where: {
        email,
      },
    });
  }

  async sendEmailForgotPassword(email: string) {
    const verifiedProfileData = await this.findByEmail(email);

    if (!verifiedProfileData)
      throw new ConflictException('ProfileData not found.');
  }

  async update(id: string, updateProfileData: UpdateProfileDataDto) {
    const profile_data = await this.findOneById(id);

    if (!profile_data) throw new NotFoundException('ProfileData not found.');

    if ('password' in updateProfileData) delete updateProfileData.password;

    return this.profile_dataRepository.merge(profile_data, updateProfileData);
  }

  async remove(id: string) {
    const profile_data = await this.findOneById(id);

    if (!profile_data) throw new NotFoundException('ProfileData not found.');

    return this.profile_dataRepository.delete(profile_data.id);
  }
}
