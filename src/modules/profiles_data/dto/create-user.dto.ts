import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateProfileDataDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
  })
  password: string;

}
