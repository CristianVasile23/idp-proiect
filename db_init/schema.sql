-- TODO: Remove this drop
\c postgres;

DROP DATABASE IF EXISTS db;
CREATE DATABASE db;

\c db;

CREATE TABLE IF NOT EXISTS post_list (
    id SMALLSERIAL PRIMARY KEY,
    markdown_content TEXT NOT NULL
);