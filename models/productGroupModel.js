module.exports = (sequelize, DataTypes) => {
  const ProductGroup = sequelize.define(
    'product_group',
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
      brand_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      brand_id: {
        type: DataTypes.INTEGER,
      },
      isBestSelling: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return ProductGroup;
};
