module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'order',
        {     
            customer_name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            phoneNumber: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            total_price: {
                type: DataTypes.INTEGER,
            },
            note: {
                type: DataTypes.STRING
            }
        },
        {
            updatedAt: false
        }
    );
    return Order
}

