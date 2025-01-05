// const nodeMailerKey = "32fe737fcd25d73472e94a57383f1d69";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a5a09baefcd0cf",
    pass: "1eb32e484d23f4",
  },
});

const mail = {
   async sendVerificationMail({from,to,subject,text,html}){

        const info = await transport.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
          });
    
          console.log("Message sent: %s", info.messageId);
    }
};

export default mail;