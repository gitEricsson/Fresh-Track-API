import User, { UserDocument } from '../models/user.model';

class UserRepository {
  private static instance: UserRepository;

  static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository();
    }
    return this.instance;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email });
  }

  async findById(userId: string): Promise<UserDocument | null> {
    return User.findById(userId);
  }

  async create(user: Partial<UserDocument>): Promise<UserDocument> {
    return User.create(user);
  }
}

export default UserRepository.getInstance();
