const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');
const moment = require('moment')

const handleCreateSubs = async (req, res) => {
    const { email } = req.body
    try {
        await sequelize.query(
            `INSERT INTO subcribers (email, createdAt) VALUES ('${email}', '${moment(new Date()).format('DD/MM/yyyy')}')`,
            { type: QueryTypes.INSERT }
        )
        res.status(200).json({ data: "oke" })
    } catch (error) {
        res.status(400).json({ message: "NOT OK" })
    }
}

const handleGetAllSubs = async (req, res) => {
    try {
        const subs = await sequelize.query(
            'SELECT * FROM subcribers',
            {
                type: QueryTypes.SELECT
            }
        )
        res.status(200).json({ data: subs })
    } catch (error) {
        res.status(400).json({ message: "NOT OK" })
    }
}

const handleGetBrandId = async (req, res) => {
    try {
        const brandIds = await sequelize.query(
            'SELECT * FROM `brands`',
            { type: QueryTypes.SELECT }
        )
        res.status(200).json({ data: brandIds })
    } catch (error) {
        res.status(400).json({ message: "NOT OK" })
    }
}

const handleCreateOrder = async (req, res) => {
    const { customerName, products, address, email, phoneNumber, totalPrice, note } = req.body
    try {
        const order = await db.orders.create(
            {
                customer_name: customerName,
                address: address,
                email: email,
                phoneNumber: phoneNumber,
                total_price: totalPrice,
                note: note
            },
            {
                fields: [
                    'customer_name',
                    'address',
                    'email',
                    'phoneNumber',
                    'total_price',
                    'note'
                ]
            }
        )
        for (let i = 0; i < products.length; i++) {
            await db.orderDetails.create(
                {
                    order_id: order.id,
                    product_id: products[i].productId,
                    quantity: products[i].quantity,
                },
                {
                    fields: [
                        'order_id',
                        'product_id',
                        'quantity'
                    ]
                }
            )
            try {
                await db.products.decrement(
                    {
                        quantity: products[i].quantity
                    },
                    {
                        where: { product_id: products[i].productId }
                    }
                )
            } catch (error) {
                return
            }
        }

        res.status(200).json({ data: order })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error,
        });
    }
}

const handleGetAllOrder = async (req, res) => {
    try {
        const orders = await sequelize.query(
            'SELECT * FROM orders',
            {
                type: QueryTypes.SELECT,
            }
        )
        res.status(200).json({ data: orders })
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: error })
    }
}

const handleGetOrderDetailById = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const details = await sequelize.query(`SELECT customer_name,address,total_price,phoneNumber,product_name,order_details.quantity,size FROM orders JOIN order_details on orders.order_id = order_details.order_id JOIN products on order_details.product_id = products.product_id WHERE order_details.order_id = ${orderId}`,
            {
                type: QueryTypes.SELECT
            })
        res.status(200).json({ data: details })
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: error })
    }
}

module.exports = {
    handleCreateOrder: handleCreateOrder,
    handleGetAllOrder: handleGetAllOrder,
    handleGetOrderDetailById: handleGetOrderDetailById,
    handleGetBrandId: handleGetBrandId,
    handleCreateSubs: handleCreateSubs,
    handleGetAllSubs: handleGetAllSubs
    // get
    // get details  
}