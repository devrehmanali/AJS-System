const envConstants = require('../envConstants');
const nodemailer = require('nodemailer');

const email = async (email, subject, message) => {
  const transport = nodemailer.createTransport(
    envConstants.MAILER_PLATFORM !== 'local'
      ? {
          host: envConstants.MAIL_HOST,
          port: envConstants.MAIL_PORT,
          auth: {
            user: envConstants.MAIL_USER,
            pass: envConstants.MAIL_PASS,
          },
        }
      : {
          host: envConstants.AWS_SES_MAIL_HOST,
          port: envConstants.AWS_SES_MAIL_PORT,
          auth: {
            user: envConstants.AWS_SES_MAIL_USER,
            pass: envConstants.AWS_SES_MAIL_PASS,
          },
        },
  );

  const mailOptions = {
    from:
      envConstants.MAILER_PLATFORM !== 'local'
        ? envConstants.ADMIN_EMAIL
        : envConstants.AWS_SES_ADMIN_EMAIL,
    to: email,
    subject: subject,
    html: `${message}`,
  };
  return await transport.sendMail(mailOptions);
};

module.exports = email;
