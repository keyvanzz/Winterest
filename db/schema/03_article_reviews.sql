DROP TABLE IF EXISTS article_reviews CASCADE;
CREATE TABLE article_reviews (
	id SERIAL PRIMARY KEY NOT NULL,
	comment VARCHAR(255),
	rating SMALLINT,
  posted_at TIMESTAMP,
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

