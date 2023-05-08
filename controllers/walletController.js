const db = require("../models");

const handleGetInfo = async (req, res) => {
  try {
    const walletInfo = await db.wallets.findOne({ where: { wallet_id: 1 } });
  } catch (error) {
    
  }
};
