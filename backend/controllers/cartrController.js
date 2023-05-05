const { db, query } = require("../database");

module.exports = {
  newTransaction: async (req, res, next) => {
    const { username, product_id, quantity, total_price } = req.body;

    try {
      const getUserIdQuery = `SELECT id_users FROM users WHERE username = '${username}'`;
      const [userIdRow] = await query(getUserIdQuery);

      if (!userIdRow) {
        return res.status(404).send({ message: "User not found" });
      }

      const userId = userIdRow.id_users;

      const addNewTransactionQuery = `INSERT INTO transaction (user_id, product_id, quantity, total_price, created_at) VALUES (${userId}, ${product_id}, ${quantity}, ${total_price}, NOW())`;

      await query(addNewTransactionQuery);

      console.log(req.body)

      res.status(200).send({ message: "Transaction added successfully" });
    } catch (error) {
      next(error);
    }
  },
};
