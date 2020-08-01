const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const sendgridApiKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridApiKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'loi@dronestudyguide.com',
    subject: 'Welcome to our Study guide!!',
    text: `Have fun studying ${name}!`
  })
}

const accountDeletionFollowupEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'loi@dronestudyguide.com',
    subject: "So sad we've lost you",
    text: `Thank you for using our service ${name}. We sent a short survey to learn what we could do to make you want to stay. We'd appreciate it if you'd answer our question!`
  })
}

module.exports = {
  sendWelcomeEmail,
  accountDeletionFollowupEmail
}
