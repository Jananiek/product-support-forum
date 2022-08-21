import { getConnection, getRepository, InsertResult, UpdateResult } from 'typeorm';
import { User } from '../../../typeorm/entities/User';
import { UserRegisterDto } from '../dto/userRegisterDto';

export class UserRepository {
  public async getOne(email: string): Promise<User> {
    return await getRepository(User).findOne({ where: { email } });
  }
  public async getOneById(id: number): Promise<User> {
    return await getRepository(User).findOne({ where: { id } });
  }

  public async getOneByRefreshToken(token: string): Promise<User> {
    return await getRepository(User).findOne({ where: { refreshToken:token } });
  }
  public async createUser(user: UserRegisterDto): Promise<InsertResult> {
    try {
      return await getConnection().createQueryBuilder().insert().into(User).values(user).execute();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateUser(user: UserRegisterDto): Promise<UpdateResult> {
    try {
      return await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(user)
        .where({ email: user.email })
        .returning('*')
        .execute();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
