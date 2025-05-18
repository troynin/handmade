'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Toys', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    height: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    width: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    weight: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Toys');
}
