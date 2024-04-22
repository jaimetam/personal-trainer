
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,

    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
     generalData_id:{
      type: DataTypes.INTEGER,
      references:{
        model: 'generaldata',
        key: 'id',
      },
    },
    routine_id:{
      type: DataTypes.INTEGER,
      references:{
        model: 'routine',
        key: 'id',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        try {
          newUser.password = await bcrypt.hash(newUser.password, 10);
          return newUser;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
      beforeUpdate: async (updatedUser) => {
        try {
          updatedUser.password = await bcrypt.hash(
            updatedUser.password,
            10
          );
          return updatedUser;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;

