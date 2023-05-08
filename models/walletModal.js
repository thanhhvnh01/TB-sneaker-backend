module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "wallet",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return Wallet;
};
