// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {
//   router.post("/articles", (req, res) => {
//     let query = `INSERT INTO  articles (title, description, thumbnail, url, post_date, topic, author_id)`;
//     console.log(query);
//     db.query(query)
//       .then(data => {
//         const articles = data.rows;
//         res.json({ articles });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };

// CREATE TABLE articles (
//   id SERIAL PRIMARY KEY NOT NULL,
//   title VARCHAR(100) NOT NULL,
//   description VARCHAR(255) NOT NULL,
//   thumbnail VARCHAR(255) NOT NULL,
//   url VARCHAR(500) NOT NULL,
//   post_date DATE,
//   -- likes BOOLEAN NOT NULL DEFAULT FALSE,
//   topic VARCHAR(50) NOT NULL,
//   author_id INTEGER REFERENCES users(id) ON DELETE CASCADE
