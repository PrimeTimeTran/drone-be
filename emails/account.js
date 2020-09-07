const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
const sendgridApiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendgridApiKey);

const templates = {
  register: "d-8cf7a61a05a446bfa310932fbb9decd3",
  "reset-password": "d-cc51b74e5067489f9b6643fc5165d0e6"
};

function sendEmail(data) {
  const msg = {
    to: data.receiver,
    from: data.sender,
    templateId: templates[data.templateName],
    dynamic_template_data: data.dynamic_template_data,
  };
  sgMail.send(msg, (error, _) => {
    if (error) {
      console.log(error);
    } else {
      console.log("That's wassup!");
    }
  });
}

const sendWelcomeEmail = (email, name) => {
  const data = {
    name,
    receiver: email,
    templateName: "register",
    sender: "loi@dronestudyguide.com",
    dynamic_template_data: {
      name,
      Sender_Name: "Loi Van Tran",
      Sender_Address: '2405 Nugget Lane',
    }
  };
  sendEmail(data)
};

const sendPasswordResetEmail = (email, url) => {
  const data = {
    receiver: email,
    templateName: "reset-password",
    sender: "loi@dronestudyguide.com",
    dynamic_template_data: {
      Reset_URL: url
    }
  };
  sendEmail(data)
}

const accountDeletionFollowupEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "loi@dronestudyguide.com",
    subject: "So sad we've lost you",
    text: `Thank you for using our service ${name}. We sent a short survey to learn what we could do to make you want to stay. We'd appreciate it if you'd answer our question!`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  accountDeletionFollowupEmail,
};
