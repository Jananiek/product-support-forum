import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../users/repositories/index';
import { User } from '../../../typeorm/entities/User';
import { RegisterDto } from '../dto/registerDto';
import { LoginDto } from '../dto/loginDto';
import { CustomError, ForbiddenError, NoContent } from '../../../utils/errorHandle/customErrors';
import dotenv from 'dotenv';
dotenv.config();
const jwt = require('jsonwebtoken');


export class AuthService {
  protected userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }

  public async registerUSer(user: RegisterDto): Promise<User> {
    //Check existing user
    const existingUser = await this.userRepo.getOne(user.userName);
    if (existingUser) {
      throw new CustomError('User is already registered');
    }
    // encrypt the password & save user
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const { raw } = await this.userRepo.createUser(user);
    if (raw[0]) {
      return await this.userRepo.getOne(raw[0]['userName']);
    }
    return null;
  }

  public async loginUser(user: LoginDto): Promise<Record<string, string>> {
    //Check existing user
    const foundUser = await this.userRepo.getOne(user.email);
    if (!foundUser) {
      throw new CustomError('Unauthorized');
    }
    // evaluate the password
    const match = await bcrypt.compare(user.password, foundUser.password);
    if (!match) {
      throw new CustomError('Password does not match');
    }
    //TODO: Create JWT token to allow access to other routes
    const accessToken = jwt.sign({ username: foundUser.userName }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s',
    });
    const refreshToken = jwt.sign({ username: foundUser.userName }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    //save refresh token
    foundUser.refreshToken = refreshToken;
    const { raw } = await this.userRepo.updateUser(foundUser);

    return { accessToken, refreshToken };
  }

  public async handleRefreshToken(refreshToken: string): Promise<any> {
    //Check existing user
    const foundUser = await this.userRepo.getOneByRefreshToken(refreshToken);
    if (!foundUser) {
      throw new ForbiddenError('Forbidden');
    }
    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.userName === decoded.username) throw new ForbiddenError('Forbidden');
      const accessToken = jwt.sign({ username: decoded.username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30s',
      });
      return accessToken;
    });
  }

  public async logoutUser(refreshToken: string): Promise<any> {
    //Check existing user
    const foundUser = await this.userRepo.getOneByRefreshToken(refreshToken);
    if (!foundUser) {
      throw new NoContent('No Content');
    }
    foundUser.refreshToken = '';
    await this.userRepo.updateUser(foundUser);
   
  }
}
