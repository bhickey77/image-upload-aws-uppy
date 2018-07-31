# Image Uploading with AWS S3, Uppy, React, Node PostgreSQL
I created this example URL for a lecture that I gave on image handling. I use a combination of the above technologies to hand uploading an image, saving the image on AWS S3 and showing the image with a generated signed URL.

To use this code you will need to create a .env file with the following information this will require the creation of an AWS account and AWS S3 bucket:

This repo is currently using

SERVER_SESSION_SECRET = <anything>
aws_access_key_id = <aws_access_key_id>
aws_secret_access_key = <aws_secret_access_key>
bucket_name = <bucket_name>