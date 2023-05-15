module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('product_image', {
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  });
  return Image;
};
