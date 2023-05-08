const db = require('../models');

const handleSignUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.users.create(
      {
        user_name: username,
        password: password,
      },
      { fields: ['user_name', 'password'] }
    );
    res.status(200).json({ data: user, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.users.findOne({
      attributes: ['user_name', 'password'],
      where: { user_name: username },
    });
    if (
      username === user.dataValues.user_name &&
      password === user.dataValues.password
    ) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleSignUp: handleSignUp,
};
