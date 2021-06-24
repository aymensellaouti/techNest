import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserService } from './user.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserEntity } from './entites/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }
  @Post()
  register(
    @Body() userData: UserSubscribeDto
  ) {
    return this.userService.register(userData);
  }

  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.userService.login(credentials);
  }

  @Get('all')
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
