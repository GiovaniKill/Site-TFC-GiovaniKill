import { compareSync } from 'bcryptjs';
import ITokenPayload from '../entities/ITokenPayload';
import TokenManager from '../utils/TokenManager';
import HTTPError from '../utils/HTTPError';
import IUsersRepository from '../repositories/IUsers.repository';

// O Service não acessa diretamente o Model, ele faz isso através do repository, para deixar mais prática uma eventual mudança de ORM

export default class UserService {
  private repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new HTTPError(401, 'Incorrect email or password');
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) throw new HTTPError(401, 'Incorrect email or password');
    return TokenManager.create({ email: user.email, role: user.role });
  }

  static validate(token: string) {
    const { data: { role } } = TokenManager.validate(token) as ITokenPayload;
    return role;
  }
}
