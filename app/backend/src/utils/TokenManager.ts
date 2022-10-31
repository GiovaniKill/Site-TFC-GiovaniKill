import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import HTTPError from './HTTPError';

export default class TokenManager {
  static create(payload: unknown): string {
    const secret = process.env.JWT_SECRET || 'secret' as jwt.Secret;
    const config: jwt.SignOptions = {
      expiresIn: '24h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: payload }, secret, config);

    return token;
  }

  static validate(token: string) {
    const secret = process.env.JWT_SECRET || 'secret' as jwt.Secret;
    try {
      const result = jwt.verify(token, secret);
      return result;
    } catch (e) {
      throw new HTTPError(400, 'Invalid token');
    }
  }
}
