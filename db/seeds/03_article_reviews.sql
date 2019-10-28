-- SELECT * FROM articles
-- JOIN articles ON article_id = articles.id;

INSERT INTO article_reviews (comment, rating, article_id, user_id)
 VALUES ('IT IS THE BEES KNEES. This is the best comment I have ever seen!', 5, 1, 2 );


INSERT INTO article_reviews (comment, rating, article_id, user_id)
 VALUES ('I mean, its alright...This is the most mediocre comment I have ever seen!', 3, 1 , 1);


 INSERT INTO article_reviews (comment, rating, article_id, user_id)
 VALUES ('What is this article?! This is the worst comment I have ever seen!', 1, 2, 1);


-- SELECT * FROM articles, article_reviews WHERE articles.id = article_id;
