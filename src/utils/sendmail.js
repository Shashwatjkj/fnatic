import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";
 
const sendEmail=async(email,emailType, verifycode)=>{
    try {
            // configure todo;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.MAIL,
              pass: process.env.MAIL_PASS,
            },
          });

          const mailOpt={
            from: process.env.MAIL, // sender address
            to: email, // list of receivers
            subject: emailType==="verify" ?"Verfiy your email" : "Reset your password", // Subject line
            text: "Your verification code is" + verifycode, // plain text body
            html: "<b>Verify your Email</b><br>", // html body
          }
          const sended =await transporter.sendMail(mailOpt);
          return sended;

    } catch (error) {
        throw new ApiError(400,"mail is not send");
    }
}
 export {sendEmail}