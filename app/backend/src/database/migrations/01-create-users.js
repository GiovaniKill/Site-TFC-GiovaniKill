module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        id: {
          primaryKey: true,
          autoIncrement: true,  
          type: Sequelize.INTEGER,
        },
        username: {
          allowNull: false,
          type: Sequelize.STRING(40),
        },
        role: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('users');
    },
  };
  