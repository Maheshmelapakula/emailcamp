require('dotenv').config();
const nodemailer = require('nodemailer');


// Configure Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  
});




// Function to send an email
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Campaign Manager" <mahesh444su@gmail.com>',
      to,
      subject,
      html,
    });
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

module.exports = sendEmail;
