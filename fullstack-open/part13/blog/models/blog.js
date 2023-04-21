const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isYear: function (value) {
          if (value >= 1991 && value <= new Date().getFullYear()) {
            return true;
          } else {
            throw new Error(
              'Year cannot be earlier than 1991 and cannot exceed the current year'
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
