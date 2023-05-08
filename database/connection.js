const { Sequelize } = require("sequelize");

const db = new Sequelize("tb_sneaker_db", "root", "Duythanh1", {
  host: "localhost",
  dialect: "mysql",
});

const connectMySQL = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectMySQL;
