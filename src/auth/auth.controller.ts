import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signup(@Body() data: SignupDto): Promise<Partial<User>> {
    return await this.authService.signup(data);
  }

  @Post()
  async signin(@Body() data: SigninDto): Promise<Partial<User>> {
    return await this.authService.signin(data);
  }
}
