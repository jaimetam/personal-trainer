const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Routine extends Model {}

Routine.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      routine:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'routine',

  }

);

module.exports = Routine;