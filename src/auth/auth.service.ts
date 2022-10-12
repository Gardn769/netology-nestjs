import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { UtilService } from '../common/utils/util.service';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private utilService: UtilService,
  ) {}

  signup(data: SignupDto): Promise<Partial<User>> {
    const user: UserDocument = new this.userModel({
      passwordHash: this.utilService.getHash(data.password),
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
    const passwordHash: string = this.utilService.getHash(data.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (passwordHash !== user.passwordHash) {
      throw new UnauthorizedException();
    }
    delete user.passwordHash;
    return user;
  }
}
