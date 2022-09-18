
const nodemailer = require("nodemailer");

module.exports.sendMail=async function sendMail(str,data){ 
   let transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true, 
   auth: {
     user: 'saketjha1101@gmail.com', 
     pass: 'vgfuxuizafvevsoa', 
   },
 });
let Osubject,Ohtml;
if(str=="Register"){
   Osubject=`Thank You for Registering ${Date.now()}`
   Ohtml=`
   <h1>Welcome to Our Platform </h1>
   Hope you have a good day
   Here is your datails
   Name = ${data.name}
   Email = ${data.email}`
}else if(str == "login"){
    Osubject= `Than you for Login`
    Ohtml`
    Email = ${data.email}`
}

 let info = await transporter.sendMail({
   from: '"Dare Deals 👻"< saketjha1101@gmail.com>', 
   to: data.email,
   subject: Osubject, 
   html: Ohtml, 
 });

 console.log("Message sent: %s", info.messageId);
}


