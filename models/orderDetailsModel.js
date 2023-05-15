module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define(
        'order_detail',
        {
            order_id: {
                type: DataTypes.INTEGER,
            },
            product_id: {
                type: DataTypes.INTEGER,
            },
            quantity: {
                type: DataTypes.INTEGER,
            },
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
    return OrderDetails
}
