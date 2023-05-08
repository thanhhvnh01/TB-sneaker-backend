module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('image', {
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
