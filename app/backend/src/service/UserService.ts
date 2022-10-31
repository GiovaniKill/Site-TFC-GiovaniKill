import { compareSync } from 'bcryptjs';
import ITokenPayload from '../entities/ITokenPayload';
import TokenManager from '../utils/TokenManager';
import HTTPError from '../utils/HTTPError';
import IUserRepository from '../repositories/IUser.repository';

// O Service não acessa diretamente o Model, ele faz isso através do repository, para deixar mais prática uma eventual mudança de ORM

export default class UserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  login = async (email: string, password: string): Promise<string> => {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new HTTPError(401, 'Incorrect email or password');
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) throw new HTTPError(401, 'Incorrect email or password');
    return TokenManager.create({ email: user.email, role: user.role });
  };

  validate = (token: string) => {
    const { data: { role } } = TokenManager.validate(token) as ITokenPayload;
    return role;
  };
}
