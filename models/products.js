module.exports = function (sequelize, DataTypes) {
  var Products = sequelize.define('Products', {
    name: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER },
    inStock: { type: DataTypes.BOOLEAN },
    price: { type: DataTypes.DOUBLE },
    description: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING }
  });
  return Products;
};
