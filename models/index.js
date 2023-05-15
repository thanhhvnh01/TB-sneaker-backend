'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// const userModal = require("./userModel.js");
// db.users = userModal(sequelize, Sequelize.DataTypes);

// const walletModal = require("./walletModal");
// db.wallets = walletModal(sequelize, Sequelize.DataTypes);

const productModal = require('./productModal');
db.products = productModal(sequelize, Sequelize.DataTypes);

const productGroupModel = require('./productGroupModel');
db.productGroups = productGroupModel(sequelize, Sequelize.DataTypes);

const orderModel = require('./orderModel');
db.orders = orderModel(sequelize,Sequelize.DataTypes)

const orderDetails = require('./orderDetailsModel');
db.orderDetails = orderDetails(sequelize,Sequelize.DataTypes)

const imageModal = require('./imageModel');
db.image = imageModal(sequelize, Sequelize.DataTypes);

db.sequelize.sync({ force: false });

module.exports = db;
