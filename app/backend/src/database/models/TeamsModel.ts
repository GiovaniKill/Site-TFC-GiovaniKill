import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING(40),
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
});

export default Teams;
