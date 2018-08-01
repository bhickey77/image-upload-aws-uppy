database name:
image-upload-aws-uppy

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    media_url VARCHAR (2000) NOT NULL,
    title VARCHAR (100),
    content VARCHAR (1000)
);