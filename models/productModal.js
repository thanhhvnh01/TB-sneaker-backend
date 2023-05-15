module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      product_group_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      product_group_id: {
        type: DataTypes.INTEGER,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return Product;
};
