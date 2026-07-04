
const nodemailer = require("nodemailer");
const transporter = require("../config/emailVerify");

const sendLoginEmail = async (email, password,name) => {
  const loginLink = `http://localhost:3000/login/${email}/${password}`; // your frontend login route

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login Credentials",
    html: `
      <h2>Dear ${name}!</h2>
      <p>Your account has been created!</p>
    //   <p><strong>Email:</strong> ${email}</p>
    //   <p><strong>Password:</strong> ${password}</p>
    //   <p><a href="${loginLink}">Click here to login</a></p>
    `,
  });
};

module.exports = { sendLoginEmail };
