import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfilesDataService } from '../profiles_data/profiles_data.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private profiles_dataService: ProfilesDataService,
    private jwtService: JwtService,
  ) { }

  async signIn(email: string, password: string): Promise<any> {
    const profile_data = await this.profiles_dataService.findOneWithEmail(email);

    if (!profile_data) {
      throw new NotFoundException('ProfileData not found.');
    }
    if (!profile_data.password) {
      throw new BadRequestException('No password set for this profile.');
    }

    const isEqual = await bcrypt.compare(password, profile_data.password);

    if (!isEqual) {
      throw new BadRequestException('Wrong password or email');
    }

    const payload = {
      sub: profile_data.id,
      email: profile_data.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async getProfile(req: any): Promise<any> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
