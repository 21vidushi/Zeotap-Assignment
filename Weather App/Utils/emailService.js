const nodemailer = require('nodemailer');
const { emailUser, emailPass } = require('../DB/dbconfig');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      pass: process.env.MAIL_PASS,
      user: process.env.MAIL_USER,
    },
  });
  

const sendAlertEmail = async (city, temp) => {
    const mailOptions = {
        from: 'amanupadhyay33822@gmail.com',
        to: 'aman.2125it1174@kiet.edu',
        subject: `Weather Alert for ${city}`,
        text: `Alert: Temperature in ${city} exceeds the threshold of 35°C! Current temperature: ${temp}°C.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = { sendAlertEmail };
