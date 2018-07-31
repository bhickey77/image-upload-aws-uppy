database name:
image-upload-aws-uppy

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