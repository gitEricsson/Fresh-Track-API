import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user.repository';
import { UserDocument } from '../models/user.model';
import AppConfig from '../config/app.config';

class AuthService {
  async signup(data: Partial<UserDocument>) {
    if (!data.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserRepository.create({
      ...data,
      password: hashedPassword,
    });

    const userId = user?._id;
    if (!userId) {
      throw new Error('User ID is missing');
    }
    return {
      user,
      accessToken: jwt.sign(
        { id: userId, role: user.role },
        AppConfig.jwt.ACCESS_TOKEN_SECRET || '',
        {
          expiresIn: '1d',
        }
      ),
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await UserRepository.findByEmail(data.email);

    if (!user || !(await bcrypt.compare(data.password, user.password ?? ''))) {
      throw new Error('Invalid email or password');
    }

    const secret = AppConfig.jwt.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }
    return jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: '1d',
    });
  }

  async googleAuthCallback(user: UserDocument) {
    let existingUser = await UserRepository.findByEmail(user.email);

    if (!existingUser) {
      existingUser = await UserRepository.create(user);
    }

    const secret = AppConfig.jwt.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }
    return jwt.sign({ id: existingUser.id }, secret, {
      expiresIn: '1d',
    });
  }
}

export default new AuthService();
