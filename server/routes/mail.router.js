const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const USER = process.env.EMAIL_USERNAME;
const PASS = process.env.EMAIL_PASSWORD;

let transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: USER,
      pass: PASS
    }
  }
  
let transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });


router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  // var message = req.body.message
  // var content = `name: ${name} \n email: ${email} \n message: ${message} `
  var content = `${name}, we're so excited to have you as a partner of Local Crate. \n \n Please join us to help share your story by using Social Crate. \n \n Sign up for Social Crate here: http://localhost:3000/?#/register`

  var mail = {
    from: name,
    to: email,
    subject: 'Join us at Social Crate!',
    text: content,
    // html: '<p>This is html!</p>'
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log('error sending mail');
    } else {
      console.log('successfully sent mail');
    }
  })
})

module.exports = router;