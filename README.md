# Image Uploading with AWS S3, Uppy, React, Node PostgreSQL
I created this repo for a lecture that I gave on image handling. I use a combination of the above technologies to handle uploading an image, saving the image on AWS S3, and showing the image with a generated signed URL. I give three examples of varying complexity for the upload user interface.

## Database
I am using PostgreSQL. The database name is set to image_upload in the pool.js currently. Change this to something relevant to your project. Create a database with your choosen database name and run the query in the database.sql file.

## CSS
Note that in the App.js I have included a line to get the relevant Uppy styles to apply. You may need to change this if you are using a different Type of Uppy component. 
```import '@uppy/drag-drop/dist/style.css';```

## AWS S3 bucket creation steps
1. Create AWS account.
1. Create S3 bucket.
1. Retrieve keys from AWS
  * Click account username in navbar
  * Select 'My Security Credentials'
  * Select access keys
  * Click 'Create new access key'

## Secrets
To use this code you will need to create a .env file with the following information this will require the creation of an AWS account and AWS S3 bucket as detailed above. Make sure that the .env file is in your gitignore. Revealing keys in your Github will result in a barrage of emails from Github and Amazon about the security vulnerability ... I hear. 

```SERVER_SESSION_SECRET = <anything>
aws_access_key_id = <aws_access_key_id>
aws_secret_access_key = <aws_secret_access_key>
bucket_name = <bucket_name>```

