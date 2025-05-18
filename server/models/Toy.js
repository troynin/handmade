export default function (sequelize, DataTypes) {
  const Toy = sequelize.define('Toy', {
    name: DataTypes.STRING,
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    imageUrl: DataTypes.STRING
  }, {});

  return Toy;
};

































