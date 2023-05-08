module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return User;
};
