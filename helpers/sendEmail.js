// require("dotenv").config();
// const nodemailer = require("nodemailer");

// const { EMAIL, EMAIL_PASSWORD } = process.env;

// const config = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: EMAIL,
//     pass: EMAIL_PASSWORD,
//   },
// };

// const sendEmail = (verificationCode, email) => {
//   const transporter = nodemailer.createTransport(config);

//   const emailOptions = {
//     from: EMAIL,
//     to: email,
//     subject: "test",
//     html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
//   };

//   transporter
//     .sendMail(emailOptions)
//     .then((info) => console.log(info))
//     .catch((err) => console.log(err));
// };

// module.exports = sendEmail;

// const transporter = nodemailer.createTransport(config);

// const sendEmail = async (data) => {
//   const email = { ...data, from: EMAIL };
//   await transporter.sendMail(email);
//   return true;
// };

// module.exports = sendEmail;

const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "ssapientiaa@outlook.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
