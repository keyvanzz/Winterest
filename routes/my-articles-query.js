const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/my-articles", (req, res) => {
    console.log("lolz hello log %&%&%&%&")
    let query = `SELECT articles.* FROM users JOIN articles ON author_id = users.id WHERE username = '${req.session.user_id}' ORDER BY id ASC`;
    console.log(query);
    db.query(query)
      .then(data => {
        const articles = data.rows;
        res.json({ articles });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
