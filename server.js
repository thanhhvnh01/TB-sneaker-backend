const express = require("express");
const routes = require("./routes/authRoute");
const cors = require("cors");
const connectMySQL = require("./database/connection");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/", routes);

app.listen(2001, () => {
  console.log("im running");
});

connectMySQL();
