require('dotenv').config()
const nodemailer=require('nodemailer')
 
class forgotEmailsend{
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });
    } 
    
async sendmessage({emailUser, num}){
      await this.transporter.sendMail({
        from:process.env.EMAIL,
        to:emailUser,
        text:num
    })
    }
}

module.exports=forgotEmailsend