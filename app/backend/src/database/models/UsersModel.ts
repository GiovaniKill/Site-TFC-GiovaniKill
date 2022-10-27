import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(40),
  },
  role: {
    allowNull: false,
    type: STRING(100),
  },
  email: {
    allowNull: false,
    type: STRING(100),
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'users',
});

export default Users;
