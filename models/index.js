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

const imageModal = require();

db.sequelize.sync({ force: false });

module.exports = db;
