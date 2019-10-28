// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const dbQueries  = require('./lib/queries');
const cookieSession = require('cookie-session')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// app.use(cookie-bodyParser())
// app.use(cookieParser())
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'user_id',
  keys: ['cat'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const articlesRoutes = require("./routes/articles");
const myArticlesRoutes = require("./routes/my-articles-query");
// const newArticlesRoutes = require("./routes/newArticlesRoutes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/articles", articlesRoutes(db));
app.use("/my-articles-query", myArticlesRoutes(db));
// app.use("/newArticles", newArticlesRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/profile", (req, res) => {
  db.query(`SELECT * FROM users WHERE username = '${req.session.user_id}'`).then(result => {
    userInfo= result.rows[0];
    let templateVars = {user: req.session.user_id, userInfo}
    res.render("profile", templateVars)
  })
});

app.get("/", (req, res) => {
  let templateVars = {user: req.session.user_id , filter: 'articles'};
  res.render("index", templateVars)
});

app.get("/my-articles", (req, res) => {
  let templateVars = {user: req.session.user_id, filter: 'my-articles'};
  res.render("my-articles", templateVars)
});

app.get("/newArticles", (req, res) => {
  let templateVars = {user: req.session.user_id};
  res.render("addArticle", templateVars)
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect("/")
})

app.get("/login", (req, res) => {
  let templateVars = {user: req.session.user_id};
  res.render("login", templateVars)
});

app.post('/login', (req, res) => {
  const userCheck = authenticateUser(req.body.username, req.body.password).then(user => {
    if(user){
      req.session.user_id = req.body.username;
      res.redirect('/')
    } else{
      res.status(403).send("bad login")
    }
  })
});

app.post('/like', (req, res) => {
  console.log(req.params)
  let userID = findUserID(req.session.user_id).then(result => {
    db.query(`UPDATE articles SET author_id = '${result}' WHERE articles.id = `).then(result2 => res.redirect('./myArticles'))
  })
});

//json
app.get('/users', function(res){
  console.log(res)
})

app.post("/register", (req, res) => {
  addUser(req.body)
  req.session.user_id = req.body.username;
  res.redirect('/')
 });

 app.post("/newArticles", (req, res) => {
  let userID = findUserID(req.session.user_id).then(result => {
    addArticle(req.body, result).then(()=>{
     res.redirect('/')
    })
  })
});

  // db.query(`UPDATE users SET username = '${req.body.username}', email = '${req.body.email}', profile_picture = '${req.body.profile_picture}' WHERE id = '${userID}';`)
  app.post('/profile', (req, res) => {
    let userID = findUserID(req.session.user_id).then(result => {
      console.log('IS THIS WORKING')
      db.query(`UPDATE users SET password = '${req.body.password}', email = '${req.body.email}', profile_picture = '${req.body.profile_picture}' WHERE id = '${result}';`)
    }).then(result2 => res.redirect('./profile'))
      // res.redirect('/profile')
      console.log('testtest')
      console.log(req.body.password);
      console.log(req.body.email);
      console.log(req.body.profile_picture);
    });
    app.post('/like', (req, res) => {
      let userID = findUserID(req.session.user_id).then(result => {
    db.query(`UPDATE articles SET author_id = '${result}`)
    console.log(result)
    .then(result2 => res.redirect('./myArticles'))
    })
  });


  app.post("/viewArticle/:id/like", (req, res) => {
  const article_id = req.params.id;
  findUserID(req.session.user_id).then(result => db.query(`UPDATE articles SET author_id = ${result} WHERE id = ${article_id}`).then( r =>
    res.redirect("/my-articles"))
    )
  });

//   app.post('/like')
//   let userID = findUserID(req.session.user_id).then(result => {
// db.query(`UPDATE articles SET author_id = '${result}' WHERE id = ${article_id}`).then(result2 => res.redirect('./myArticles'))
//   });


app.get("/viewArticle/:id", (req, res) => {
  const article_id = req.params.id;
  return db.query(`Select articles.*, comment, posted_at from articles LEFT JOIN article_reviews ON articles.id = article_reviews.article_id where articles.id = ${article_id} ORDER BY posted_at DESC`)
  .then((result)=>{
    // console.log(result.rows[0]);
    // let article = result.rows[0];
    // let templateVars = {user: req.session.user_id, article_id, article};
    // console.log(templateVars);
    const allResults = result.rows;
    let comments = [];
    let article = allResults[0];
    for (row of allResults) {
      let commentObject = {};
      commentObject['comment'] = row.comment;
      commentObject['posted_at'] = row.posted_at;
      comments.push(commentObject);
    }
    article["allComments"] = comments;

    let templateVars = {user: req.session.user_id, article, article_id};
    res.render("viewArticle", templateVars)
  });
});

app.post("/viewArticle/:id", (req, res) => {
  let userID = 0;
  const articleID = req.params.id;
  findUserID(req.session.user_id).then(result => {
    userID = result;
    console.log("POST NEW COMMENT:",userID, articleID)
  //   return db.query(`INSERT INTO article_reviews (comment, rating, article_id, user_id) VALUES
  //   ('${req.body.text}', '3', ${articleID}, ${userID.toString()});
  // ` ).then(async (data) => {
  //   // res.redirect(`/viewArticle/${articleID}`);
  //   console.log('what is data', data)
  //   console.log("articleID to get coment", articleID)
  //   const commentQuery = await db.query(`SELECT comment FROM articles LEFT JOIN article_reviews ON articles.id = article_reviews.article_id WHERE article_reviews.article_id = ${articleID}`);
  //   console.log("db query ", commentQuery);
  //   return commentQuery;

  //   res.json()

    let currentTime = Date.now();
  console.log("Time: ", currentTime);
    return db.query(`INSERT INTO article_reviews (comment, rating, posted_at, article_id, user_id) VALUES
    ('${req.body.text}', '3', to_timestamp(${currentTime}/1000), ${articleID}, ${userID.toString()});
    ` ).then(() => {
    res.redirect(`/viewArticle/${articleID}`);
  })
  }).catch(err => {
    console.log("Error in getting userid: ", err);
  });

});

function authenticateUser(username, password){
  return db.query("Select id, username, email from users where username = '"+username+"' and password='"+password+"'")
  .then((result)=>{
    return result.rows[0];
  });
}
const addUser =  function(user) {
  return db.query(`INSERT INTO users (
    username, email, password, profile_picture)
  VALUES (
    '${user.username}', 'example@example.com', '${user.password}', 'http://ern-dubai.com/wp-content/uploads/2019/04/facebook-anonymous-app.jpg');
  `)
  .then(res => res.rows[0]);
}

const addArticle = function(article, userID) {
  return db.query(`INSERT INTO articles (title, description, thumbnail, url, topic, post_date, author_id) VALUES
  ('${article.title}', '${article.description}', '${article.thumbnail}', '${article.url}', '${article.topic}', now(), '${userID}');
  `)
  .then(res => res.rows[0]);
}

const findUserID = function(username) {
  return db.query(`SELECT id FROM users WHERE username = '${username}';`)
  .then((res) => {
    return res.rows[0].id
  })
};
module.export = findUserID;
function generateRandomString() {
  Math.random().toString(36).slice(-6);
  return Math.random().toString(36).slice(-6);
 };
app.listen(PORT, () => {
  console.log(`Winterest listening on port ${PORT}`);
});
