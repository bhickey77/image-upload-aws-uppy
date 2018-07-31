database name:
local_crate

CREATE TABLE partner (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100),
    location VARCHAR (120),
    type VARCHAR (100)
);

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    first_name VARCHAR (40) NOT NULL,
    last_name VARCHAR (40) NOT NULL,
    date_created VARCHAR (100) NOT NULL,
    date_updated VARCHAR (100) NOT NULL,
    partner_id INTEGER REFERENCES partner,
    isVerified BOOLEAN,
    user_type VARCHAR (100),
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    partner_id INT REFERENCES person,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (100) NOT NULL,
    media_url VARCHAR (2000) NOT NULL,
    date_created VARCHAR (100) NOT NULL,
    date_updated VARCHAR (100) NOT NULL,
    is_marked_as_hidden BOOLEAN NOT NULL
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR (200) NOT NULL
);

CREATE TABLE post_tags (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES post,
    tag_id INT REFERENCES tag
);
