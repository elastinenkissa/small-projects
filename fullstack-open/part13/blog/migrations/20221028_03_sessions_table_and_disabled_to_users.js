const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
};
