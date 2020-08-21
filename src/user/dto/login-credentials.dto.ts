import { IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

}
