const { Pool } = require('pg');
const dbParams = require('./db.js');
const db = new Pool(dbParams);
db.connect();

// const getUsers = (request, response) => {
//   db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows)
//   })
// };

// const getArticles = (request, response) => {
//   db.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows)
//   })
// };

// const getUserById = (request, response) => {
//   const id = parseInt(request.params.id)

//   db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) =>{
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// };

// const getArticleById = (request, response) => {
//   const id = parseInt(request.params.id)

//   db.query('SELECT * FROM articles WHERE id = $1', [id], (error, results) =>{
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// };

// const createUser = (request, response) => {
//   const {name, email, password, profile_picture} = request.body;

//   db.query('INSERT INTO users (name, email, password, profile_picture) VALUES ($1, $2, $3, $4)',
//   [name, email, password, profile_picture], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${result.insertId}`)
//   })
// };

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   const {name, email, password, profile_picture} = request.body

//   db.query(
//     'UPDATE users SET name = $1, email = $2, password = $3, profile_picture = $4 WHERE id = $5',
//     [name, email, password, profile_picture, id], (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User modified with ID: ${id}`)
//     })
// };

// const createArticle = (request, response) => {
//   const {title, description, thumbnail, url, topic}  = request.body;

//   db.query('INSERT INTO  articles (title, description, thumbnail, url, topic) VALUES ($1, $2, $3, $4, $5)',
//   [title, description, thumbnail, url, topic], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(201).send(`Article ceated with ID: ${result.insertId}`)
//   })
// };

// const deleteUser  = (request, response) => {
//   const id = parseInt(request.params.id)

//   db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// };

// const deleteArticle = (request, response) => {
//   const id = parseInt(request.params.id)

//   db.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Article deleted with ID: ${id}`)
//   })
// };

// module.exports = {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   createArticle,
//   deleteArticle,
//   deleteUser,
//   getArticles,
//   getArticleById
// }
