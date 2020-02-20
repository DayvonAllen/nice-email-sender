//dependecies
const express = require('express');
const cors = require('cors')
const nodemailer = require('nodemailer');
require('dotenv').config();

//variables for the email functions
let user = process.env.EMAIL;
let name = "";
let email = "";
let details = "";
let inquiry = "";
let formattedName = "";
let finalName = "";
let mailOptions = {};
let mailOptions2 = {};

//port
const PORT = process.env.PORT || 5500;

//initialize expree
const app = express();

//allows for cors
app.use(cors())
app.use(express.json());


app.post('/postData', (req, res) => {
//grab data and inserts into the variable
  let data = req.body
  name = data.name;
  email = data.email;
  message = data.message;
  inquiry = data.inquiry;

  //format string for display purposes
  formattedName = name.split(' ')[0];
  finalName = formattedName.split('')[0].toUpperCase() + formattedName.substring(1, formattedName.length)

  //transporter for node mailer
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',    
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
  });

  //customer mail options

  mailOptions = {
    from: user,
    to: email,
    subject: `${finalName}, we've received your message`,
    text: `${finalName}, thank you for reaching out to us. We will respond soon.`
  }

//   company mail options
  mailOptions2 = {
    from: user,
    to: user,
    subject: `An inquiry has been made!`,
    text: `Name: ${name}\nEmail: ${email}\nInquiry: ${inquiry}\nDetails: ${message}`
  }

  //sends email to the customer
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err + ' \nAn error has occurred')

    } else {
      console.log('Successfully sent email!')
    }
  });

  //sends email to company
  transporter.sendMail(mailOptions2, (err, data) => {
    if (err) {
      console.log(err + '\nAn error has occurred')
    } else {
      console.log('Successfully sent email!')
    }
  });

  //ends the connection
  res.end()

});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',  
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


mailOptions = {
  from: user,
  to: 'dayvonallen2017@gmail.com',
  subject: `${finalName}, we've received your message`,
  text: `${finalName}, thank you for reaching out to us. We will respond soon.`
}


//runs server
app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`)
})