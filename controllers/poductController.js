const { QueryTypes } = require('sequelize');
const { sequelize, image } = require('../models');
const db = require('../models');

const handleGetAllProduct = async (req, res) => {
  try {
    const products = await sequelize.query(
      'SELECT * FROM `products`',
      {
        type: QueryTypes.SELECT,
      }
    );
    const images = await sequelize.query('SELECT * FROM `product_images`');
    const data = products.map((i, index) => {
      return {
        ...i,
        images: images[0].filter((a) => {
          return a.product_image_id === i.product_id;
        }),
      };
    });

    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
  }
};
// get all product groups
const handleGetAllProductGroup = async (req, res) => {
  const { brandId, keyword } = req.body
  try {
    const productGroups = await sequelize.query(
      'SELECT  * FROM `product_groups` JOIN `brands` on product_groups.brand_id = brands.brand_id',
      {
        type: QueryTypes.SELECT,
      }
    );
    const images = await sequelize.query('SELECT * FROM `product_images`');
    const filteredProductGroups = productGroups.filter(i => {
      if (!!brandId) { return i.brand_id === brandId }
      if (!!keyword) { return i.product_group_name.includes(keyword) } else { return i }
    })
    const data = filteredProductGroups.map((i) => {
      return {
        ...i,
        images: images[0].filter((a) => {
          return a.product_image_id === i.product_group_id;
        }),
      };
    });
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
};

// 
const handleGetAllProductGroupId = async (req, res) => {
  try {
    const productGroupId = await sequelize.query(
      'SELECT `product_group_name`, `product_group_id` FROM `product_groups`',
      {
        type: QueryTypes.SELECT,
      }
    )
    res.status(200).json({ data: productGroupId });
  } catch (error) {
    res.status(400).json({ data: error });
  }
}
// get product group by ID
const handleGetProductGroupById = async (req, res) => {
  const productGroupId = req.params.productGroupId;
  try {
    const productGroupById = await db.productGroups.findOne({
      attributes: [
        'product_group_name',
        'product_group_id',
        'brand_id',
        'color',
        'price',
      ],
      where: {
        product_group_id: productGroupId,
      },
    });
    const sizes = await db.products.findAll({
      attributes: ['product_group_id', 'size', 'product_id'], where: {
        product_group_id: productGroupId
      }
    })
    const images = await db.image.findAll({
      attributes: ['image_url'], where: { product_image_id: productGroupId }
    })

    console.log(sizes);
    const array = sizes.map((s) => {
      return { size: s.dataValues?.size, productId: s.dataValues?.product_id }
    })

    const imageArr = images.map((i) => {
      return i.dataValues
    })

    const data = { ...productGroupById?.dataValues, size: array, images: imageArr }
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "failed" })
  }
};

// get product by ID
const handleGetProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const productById = await db.products.findOne({
      attributes: [
        'product_name',
        'product_group_id',
        'size',
        'quantity'
      ],
      where: { product_id: productId },
    });
    res.status(200).json({ data: productById });
  } catch (error) {
    console.log(error);
  }
};

// create product
const handleCreateProduct = async (req, res) => {
  const { productName, quantity, size, productGroupId, } = req.body;

  try {
    const product = await db.products.create(
      {
        product_name: productName,
        product_group_id: productGroupId,
        size: size,
        quantity: quantity,
      },
      {
        fields: [
          'product_name',
          'product_group_id',
          'size',
          'quantity'
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

const handleCreateProductGroup = async (req, res) => {
  const { productGroupName, brandId, price, color } = req.body;

  try {
    const productGroup = await db.productGroups.create(
      {
        product_group_name: productGroupName,
        brand_id: brandId,
        price: price,
        color: color
      },
      {
        fields: [
          'product_group_name',
          'brand_id',
          'price',
          'color'
        ]
      }
    )
    for (let i = 0; i <= 3; i++) {
      await sequelize.query(
        `INSERT INTO product_images (product_image_id, image_url) VALUES ('${productGroup.id}', '/images/Product_Image/12/12_${i + 1}.jpg') 
        `,
        {
          type: QueryTypes.INSERT
        }

      )
    }

    res.status(200).json({ data: productGroup, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
}

const handleUpdateProduct = async (req, res) => {
  const { productName, quantity, size, productGroupId, } = req.body;
  const productId = req.params.productId
  try {
    const product = await db.products.update(
      {
        product_name: productName,
        product_group_id: productGroupId,
        size: size,
        quantity: quantity,
      },
      { where: { product_id: productId } }
    );
    
    res.status(200).json({ data: product, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
}


module.exports = {
  handleGetAllProduct: handleGetAllProduct,
  handleCreateProduct: handleCreateProduct,
  handleGetProductById: handleGetProductById,
  handleGetAllProductGroup: handleGetAllProductGroup,
  handleGetAllProductGroupId: handleGetAllProductGroupId,
  handleGetProductGroupById: handleGetProductGroupById,
  handleCreateProductGroup: handleCreateProductGroup,
  handleUpdateProduct: handleUpdateProduct
  // deleteProductById
  // updateProductById
};
