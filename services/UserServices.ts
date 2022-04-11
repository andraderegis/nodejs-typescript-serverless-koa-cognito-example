import { User, UsersRespository } from '../infra/repositories/UsersRepository';

export class UserServices {
  constructor(private userRespository: UsersRespository) {}

  async authenticate(username: string, password: string): Promise<User> {
    const user = this.userRespository.findByUsername(username);

    if (!user) {
      throw new Error('User not exits');
    }

    if (user.password !== password) {
      throw new Error('User not authenticated');
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRespository.findByUsername(username);
  }
}
