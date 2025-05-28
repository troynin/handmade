'use strict';
import { Model } from 'sequelize';

export default function(sequelize, DataTypes) {
  class Toy extends Model {
    static associate(models) {
      Toy.hasMany(models.Order, { foreignKey: 'toyId' })
    }
  }

  Toy.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Toy',
    tableName: 'Toys'
  });

  return Toy;
};
