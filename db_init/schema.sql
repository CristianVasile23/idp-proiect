-- \c postgres;

-- DROP DATABASE IF EXISTS db;
-- CREATE DATABASE db;

\c db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS posts_list (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    markdown_content TEXT NOT NULL,
    time_created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(username) VALUES('admin');