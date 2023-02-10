const db = require("../models");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.users.create(
      {
        user_name: username,
        password: password,
      },
      { fields: ["user_name", "password"] }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

module.exports = { handleLogin };
