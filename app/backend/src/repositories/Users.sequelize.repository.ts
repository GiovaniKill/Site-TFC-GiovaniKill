import IUser from '../entities/IUser';
import UsersModel from '../database/models/UsersModel';
import IUserRepository from './IUsers.repository';

export default class SequelizeUsers implements IUserRepository {
  private model = UsersModel;

  findByEmail = async (email: string): Promise<IUser | null> => {
    const sequelizeUser = await this.model.findOne({ where: { email } });

    if (!sequelizeUser) return null;

    const user: IUser = {
      id: sequelizeUser.id,
      password: sequelizeUser.password,
      email: sequelizeUser.email,
      role: sequelizeUser.role,
      username: sequelizeUser.username,
    };

    return user;
  };
}
