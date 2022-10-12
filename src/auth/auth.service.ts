import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  signup(data: SignupDto): Promise<Partial<User>> {
    const user: UserDocument = new this.userModel({
      passwordHash: createHash('md5').update(data.password).digest('hex'),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    return user.save().then((user: Partial<User>): Partial<User> => {
      delete user.passwordHash;
      return user;
    });
  }

  async signin(data: SigninDto): Promise<Partial<User>> {
    const user: Partial<User> | null = await this.userModel
      .findOne({
        email: data.email,
      })
      .exec();
    const passwordHash: string = createHash('md5')
      .update(data.password)
      .digest('hex');
    if (!user) {
      throw new UnauthorizedException();
    }
    if (passwordHash !== user.passwordHash) {
      throw new UnauthorizedException();
    }
    console.log(this.jwtService.sign(data));

    delete user.passwordHash;

    return user;
  }
}
