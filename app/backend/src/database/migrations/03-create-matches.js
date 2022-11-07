module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('matches', {
        id: {
          primaryKey: true,
          autoIncrement: true,  
          type: Sequelize.INTEGER,
        },
        homeTeam: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'teams',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'home_team'
        },
        homeTeamGoals: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: 'home_team_goals'
        },
        awayTeam: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'teams',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'away_team'
        },
        awayTeamGoals: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: 'away_team_goals'
        },
        inProgress: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          field: 'in_progress'
        }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('matches');
    },
  };
  