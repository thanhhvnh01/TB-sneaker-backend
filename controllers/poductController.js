const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');

const handleGetAllProduct = async (req, res) => {
  try {
    const products = await sequelize.query(
      'SELECT * FROM `products` JOIN `brands` on products.brand_id = brands.brand_id',
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ data: products });
  } catch (err) {
    console.log(err);
  }
};

const handleCreateProduct = async (req, res) => {
  const { productName, brandId, size, productGroupId, color, price } = req.body;

  try {
    const product = await db.products.create(
      {
        product_name: productName,
        product_group_id: productGroupId,
        size: size,
        brand_id: brandId,
        color: color,
        price: price,
      },
      {
        fields: [
          'product_name',
          'product_group_id',
          'size',
          'brand_id',
          'color',
          'price',
        ],
      }
    );
    res.status(200).json({ data: product, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

// const handleGetProductGroup = async (req, res) => {
//   try {
//     const products = await sequelize.query();
//   } catch (error) {}
// };

module.exports = {
  handleGetAllProduct: handleGetAllProduct,
  handleCreateProduct: handleCreateProduct,
};
