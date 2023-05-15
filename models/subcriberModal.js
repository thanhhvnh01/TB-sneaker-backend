module.exports = (sequelize, DataTypes) => {
    const Sub = sequelize.define('subcribers', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    });
    return Sub;
  };
  