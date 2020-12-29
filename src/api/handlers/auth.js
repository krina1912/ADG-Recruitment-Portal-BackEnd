const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const sgMail=require('@sendgrid/mail')
var otpGenerator = require('otp-generator');
const path=require('path');
const express = require('express');
const { error } = require('console');
const app = express();
const mailgun = require('mailgun-js')

app.set('views', '../../views/');
app.set('view engine', 'ejs');

app.set('view engine', 'ejs');
//signup function
async function signupFunction(req,res,next) {
  //firstly salt the hashing for the password
  //genSalt is math.pow(2, value)
  const salt = await bcrypt.genSalt(10);
  //hash the password
  hashedpassword = await bcrypt.hash(req.body.password, salt)

  const emailAlreadyExists = await User.findOne({email: req.body.email})
  const phoneAlreadyExists = await User.findOne({phone:req.body.phone})
  const regNoAlreadyExists = await User.findOne({regno:req.body.regno.toUpperCase()})

  var flag =0
  if(emailAlreadyExists  && req.body.email !== undefined  ){
    res.status(400).json({
      success: false,
      message:"This Email Already exists!"
    })
    flag++;
  } else if(phoneAlreadyExists && req.body.phone !== undefined){
    res.status(400).json({
      success:false,
      message:"This Phone Number Already Exists!"
    })
    flag++;
  }else if(regNoAlreadyExists && req.body.regno !== undefined){
    res.status(400).json({
      success:false,
      message:"This Registration Number Already Exists!"
    })
    flag++;
  }
 

async function titleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for(var i = 0; i< sentence.length; i++){
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
 return sentence.join(" ");;
 }
  
  const userData = {
    ...req.body,
    password: hashedpassword,
    name: await titleCase(req.body.name),
    regno: req.body.regno.toUpperCase()
  }

  if(userData.yearofstudy == 2 && userData.githubLink == undefined){
    return res.status(400).send({
      message:"For 2nd Years, Github Link is Compulsory!"
    })
  }
  if(userData.yearofstudy ==1 && userData.githubLink===""){
    var user = new User({
      ...userData,
      githubLink:undefined
    })
  }
  else
  {
    var user = new User({
      ...userData
    })

  }
  
  try{
    if(flag == 0){
    const userSignup = await user.save();
    const payload = {
      
      _id: userSignup._id
    
  };
  //creating jwt token
  jwt.sign(payload,process.env.JWT_KEY,(err,token) => {
    if(err){
      res.status(500).send(err);
    }
    console.log(token)
    // res.status(201).json({
    //   message:"User registered successfully, but pending Email Verification!"
    // })
  })
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //   const msg={

  //     to:req.body.email,
  //     from: process.env.EMAIL_ID,
  //     subject: 'Email Verification for ADG Recruitments 2020-2021',
  //     text: 'Click on the following link to verify your account\n ' + 'https://adgrecruitments.herokuapp.com/user/get-verified/' + user._id
  //   }
  //   sgMail
  //   .send(msg)
  //   .then(()=>{
  //     try{
  //       console.log('Email successfully sent!')
  //       res.status(200).send({
  //         message:"Email has been sent"
  //       })

  //     }
  //     catch(err){
  //       console.log(err);
  //         res.status(400).send({
  //           message: "Error in sending Email!"

  //     })
   
  //   }}
  //   )
  //   .catch((error)=>{
  //     console.log(error);
  //     res.status(400).send({
  //       message: "Error in sending Email!"

  // })
    

  // });

//MAILGUN PACKAGE

var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: api_key, domain: domain});

var data = {
  from: 'Apple Developers Group VIT<noreply@adgvit.com>',
  to: req.body.email,
  subject: 'Email Verification for ADG Recruitments 2020-2021',
  html:`<!DOCTYPE html>
  <html>
  
  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
          @media screen {
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 400;
                  src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 700;
                  src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
              }
          }
  
          /* CLIENT-SPECIFIC STYLES */
          body,
          table,
          td,
          a {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
  
          table,
          td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }
  
          img {
              -ms-interpolation-mode: bicubic;
          }
  
          /* RESET STYLES */
          img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
          }
  
          table {
              border-collapse: collapse !important;
          }
  
          body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
          }
  
          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
  
          /* MOBILE STYLES */
          @media screen and (max-width:600px) {
              h1 {
                  font-size: 32px !important;
                  line-height: 32px !important;
              }
          }
  
          /* ANDROID CENTER FIX */
          div[style*="margin: 16px 0;"] {
              margin: 0 !important;
          }
      </style>
  </head>
  
  <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
      <!-- HIDDEN PREHEADER TEXT -->
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're excited to have you get started. First, you need to confirm your account. </div>
      <table style="margin-bottom: 30px;" border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- LOGO -->
          <tr>
              <td bgcolor="#027aff" align="center">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#027aff" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                              <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src="https://raw.githubusercontent.com/ADG-VIT/IosFusion_Website2019/master/assets/ADG_logo_hr.png" width="125" height="120" style="display: block; border: 0px;" />
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td align="center" style="border-radius: 3px;" bgcolor="#027aff"><a href="https://adgrecruitments.herokuapp.com/user/get-verified/${user._id}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; border: 1px solid #027aff; display: inline-block;">Confirm Account</a></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser: https://adgrecruitments.herokuapp.com/user/get-verified/${user._id}</p><br><br>
                          </td>
                      </tr> <!-- COPY -->
                      
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Cheers,<br>Team Apple Developers Group</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400;">
                              <p style="margin: 0;">This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.
                                  <br><br>Incase of any queries or discrepancies, please feel free to contact us at: <a href="mailto:appledevelopersgroup@gmail.com">appledevelopersgroup@gmail.com</a></p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                  <table bgcolor="#027aff" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-radius: 5px;">
                      <tr>
                          <td align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <h2 style="font-size: 20px; font-weight: 400; color: #FFFF; margin: 0;">Need more help?</h2>
                              <br>
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;" href="https://www.facebook.com/vitios/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/facebook-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>                            
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://www.linkedin.com/company/adgvit/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/linkedin-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://www.instagram.com/adgvit/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/instagram-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://twitter.com/adgvit" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/twitter-2-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  
  </html>`
};
 
mg.messages().send(data, function (error, body) {
  try{
          console.log('Email successfully sent!')
          res.status(200).send({
            message:"Email has been sent"
          })
  
        }
        catch(error){
          console.log(error);
         res.status(400).send({
           message: "Error in sending Email!"
  
       })
     
      }
});


// const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_ID,
//         pass: process.env.EMAIL_PASSWORD
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_ID,
//       to: req.body.email,
//       subject: 'Email Verification for ADG Recruitments 2020-2021',
//       text: 'Click on the following link to verify your account\n ' + 'https://adgrecruitments.herokuapp.com/user/get-verified/' + user._id
//     }

//     transporter.sendMail(mailOptions, (err,information) => {
//       if(err){
//       console.log(err)
//       res.status(400).send({
//         message: "Error in sending Email!"
//       }) }
//       else {
//         console.log('Email successfully sent!')
//         res.status(200).send({
//           message:"Email has been sent"
//         })
//       }
//     })

    }
    

    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //     user: process.env.EMAIL_ID,
    //     pass: process.env.EMAIL_PASSWORD
    //   }
    // });

    // const mailOptions = {
    //   from: process.env.EMAIL_ID,
    //   to: req.body.email,
    //   subject: 'Email Verification for ADG Recruitments 2020-2021',
    //   text: 'Click on the following link to verify your account\n ' + 'https://adgrecruitments.herokuapp.com/user/get-verified/' + user._id
    // }

    // transporter.sendMail(mailOptions, (err,information) => {
    //   if(err){
    //   console.log(err)
    //   res.status(400).send({
    //     message: "Error in sending Email!"
    //   }) }
    //   else {
    //     console.log('Email successfully sent!')
    //     res.status(200).send({
    //       message:"Email has been sent"
    //     })
    //   }
    // })
    /* const payload = {
      
        _id: userSignup._id
      
    };
    //creating jwt token
    jwt.sign(payload,process.env.JWT_KEY,(err,token) => {
      if(err){
        res.status(500).send(err);
      }
      console.log(token)
      res.status(201).json({
        message:"User registered successfully, but pending Email Verification!"
      })
    }) */
  }
  catch(err){
    console.log(err)
    res.status(400).send({
      message: err.message
    })
  }
}

//Login Function

async function loginFunction(req,res,next) {
  try{
  //check whether register number exists
  const regNoExists = await User.findOne({regno: req.body.regno.toUpperCase()})
  if(!regNoExists){
    res.status(400).send({
      message: "Register Number is not found!"
    })
  }
  //compare the passwords
  const checkpassword = await bcrypt.compare(req.body.password, regNoExists.password)
  if(!checkpassword){
    res.status(403).send({
      message: "The Register Number or Password is incorrect!"
    })
  }
  //check if email is verified
  if(regNoExists.isEmailVerified == false ){
    return res.status(400).send({
      message: "Your email has not been verified yet!"
    })
  } else {
    // create token and add it to the header file
  const token = jwt.sign({_id:regNoExists.id},process.env.JWT_KEY)
  res.header('auth-token',token).json({
    Token:token,
    message:"You have successfully logged in!"
  })
}} catch(err){
  res.status(400).send({
    message: err.message
  })
}
}

//logout function
/* async function logoutUser(req, res, next) {
  const regNoExists = await User.findOne({regno: req.body.regno})
  if(!regNoExists){
    res.status(400).send({
      message: "Register Number is not found!"
    })
  }
} */

async function getUserFunction(req,res){
  console.log(req.user)
  try{
    const user = await User.findOne({_id:req.user._id}).select('-isAdmin -password -responseTech -responseManagement -responseDesign -techscore -designscore')
    console.log(user);
    res.status(200).json({
      userDetails: user
    })
  } catch (err){
    res.status(400).send({
      message:"Error in finding the user!"
    })
  }
}

async function updateUserFunction(req,res){
  try{
    const userToBeUpdated = await User.findOne({_id:req.user._id}).select('-isAdmin -password -responseTech -responseManagement -responseDesign -techscore -designscore -isEmailVerified')
    if(!userToBeUpdated){
      res.status(400).send({
        message: "User to be Updated Not Found!"
      })
    } else {
      userToBeUpdated.name = req.body.name;
  
      userToBeUpdated.githubLink = req.body.githubLink;
  
      userToBeUpdated.phone= req.body.phone;

      await userToBeUpdated.save();
      res.status(200).send(userToBeUpdated)
    }
    } catch(error) {
      res.status(500).send({
        message: "Error"
      })
    }
}

async function verifyEmail(req,res,next) {
  await User.findByIdAndUpdate(req.params.userId, {isEmailVerified: true}, (err,result) => {
    if(err)
   res.render('register',{message:"There was an error verifying your email!"});
    else res.render('register',{message:"Your email has been verified!"});
  })
}
async function passwordReset(req,res,next){
 
  const user= await User.findOne({email:req.body.email})
  .then(async (user)=>{
   const otp=otpGenerator.generate(6, { upperCase: false, specialChars: false ,alphabets:false});
   if(user==null)
   res.status(401).send({message:"User not found!"})
   else
   {
     user.resetToken = otp;
   
     user.resetExpires=Date.now()+300000;
 
 
     await user.save();
     // user.update({upsert:true},{
     //   resetToken:otp,
     //   resetExpires:Date.now()+300000
       
     // })
var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: api_key, domain: domain});

var data = {
  from: 'Apple Developers Group VIT<noreply@adgvit.com>',
  to: req.body.email,
  subject: 'Password Reset ADG VIT',
  html:`<!DOCTYPE html>
  <html>
  
  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
          @media screen {
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 400;
                  src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 700;
                  src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
              }
          }
  
          /* CLIENT-SPECIFIC STYLES */
          body,
          table,
          td,
          a {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
  
          table,
          td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }
  
          img {
              -ms-interpolation-mode: bicubic;
          }
  
          /* RESET STYLES */
          img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
          }
  
          table {
              border-collapse: collapse !important;
          }
  
          body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
          }
  
          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
  
          /* MOBILE STYLES */
          @media screen and (max-width:600px) {
              h1 {
                  font-size: 32px !important;
                  line-height: 32px !important;
              }
          }
  
          /* ANDROID CENTER FIX */
          div[style*="margin: 16px 0;"] {
              margin: 0 !important;
          }
      </style>
  </head>
  
  <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
      <!-- HIDDEN PREHEADER TEXT -->
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> Don't worry. We have got your back at this. Use the below OTP to reset your password. </div>
      <table style="margin-bottom: 30px;" border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- LOGO -->
          <tr>
              <td bgcolor="#027aff" align="center">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#027aff" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                              <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Forgot Password?</h1> <img src="https://raw.githubusercontent.com/ADG-VIT/IosFusion_Website2019/master/assets/ADG_logo_hr.png" width="125" height="120" style="display: block; border: 0px;" />
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Don't worry. We have got your back at this. Use the below OTP to reset your password.</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td align="center" style="border-radius: 3px; padding: 15px 25px; color: white; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 40px; text-decoration: none" bgcolor="#027aff" >${otp}</td>
                                              </tr>
                                              <tr>
                                              <td bgcolor="#ffffff" align="center" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
                                                  <p style="margin: 0;">The above OTP is valid only for 5 mins</p>
                                              </td>
                                          </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Cheers,<br>Team Apple Developers Group</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400;">
                              <p style="margin: 0;">This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.
                                  <br><br>Incase of any queries or discrepancies, please feel free to contact us at: <a href="mailto:appledevelopersgroup@gmail.com">appledevelopersgroup@gmail.com</a></p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                  <table bgcolor="#027aff" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-radius: 5px;">
                      <tr>
                          <td align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <h2 style="font-size: 20px; font-weight: 400; color: #FFFF; margin: 0;">Need more help?</h2>
                              <br>
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;" href="https://www.facebook.com/vitios/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/facebook-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>                            
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://www.linkedin.com/company/adgvit/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/linkedin-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://www.instagram.com/adgvit/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/instagram-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://twitter.com/adgvit" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/twitter-2-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  
  </html>`
};
 
mg.messages().send(data, function (error, body) {
  try{
          console.log('Email successfully sent!')
          res.status(200).send({
            message:"Email has been sent"
          })
  
        }
        catch(error){
          console.log(error);
         res.status(400).send({
           message: "Error in sending Email!"
  
       })
     
      }
});
//      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//    const msg={
 
//      to:req.body.email,
//      from: process.env.EMAIL_ID,
//      to: req.body.email,
//      subject: 'Password Reset ADG VIT',
//      text: 'Your password reset OTP is : '+otp
//    }
//    sgMail
//    .send(msg)
//    .then(()=>{
//      try{
//        console.log('Email successfully sent!')
//        res.status(200).send({
//          message:"Email has been sent"
//        })
 
//      }
//      catch(err){
//        console.log(err);
//          res.status(400).send({
//            message: "Error in sending Email!"
 
//      })
  
//    }}
//    )
//    .catch((error)=>{
//      console.log(error);
//      res.status(400).send({
//        message: "Error in sending Email!"
 
//  })
 
//    })
   }  
   
  })
 
  }
 
 
 
 async function updatePassword(req,res,next){
   await User.findOne({resetToken:req.body.otp,resetExpires:{$gt:Date.now()}})
   .then(async (user)=>{
     console.log(user)
     if(!user){
       console.log('User not found!');
       res.status(401).send({message:"Incorrect OTP"})
       
     }
     else{
       const salt = await bcrypt.genSalt(10);
   //hash the password
   hashedpassword = await bcrypt.hash(req.body.password, salt)
 
   user.password = hashedpassword;
   
     user.resetToken=null;
 
 
     await user.save();
 
       
       res.status(200).send({message:"Password Updated"});
     }
   })
   .catch((err)=>{
     res.status(500);
   }
 
 
   )
     
 
 }

 async function resendverification(req,res,next){
var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: api_key, domain: domain});

 var uid=await User.findOne({email:req.body.email}).select('_id');

 var data = {
  from: 'Apple Developers Group VIT<noreply@adgvit.com>',
  to: req.body.email,
  subject: 'Email Verification for ADG Recruitments 2020-2021',
  html:`<!DOCTYPE html>
  <html>
  
  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
          @media screen {
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 400;
                  src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 700;
                  src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
              }
          }
  
          /* CLIENT-SPECIFIC STYLES */
          body,
          table,
          td,
          a {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
  
          table,
          td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }
  
          img {
              -ms-interpolation-mode: bicubic;
          }
  
          /* RESET STYLES */
          img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
          }
  
          table {
              border-collapse: collapse !important;
          }
  
          body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
          }
  
          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
  
          /* MOBILE STYLES */
          @media screen and (max-width:600px) {
              h1 {
                  font-size: 32px !important;
                  line-height: 32px !important;
              }
          }
  
          /* ANDROID CENTER FIX */
          div[style*="margin: 16px 0;"] {
              margin: 0 !important;
          }
      </style>
  </head>
  
  <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
      <!-- HIDDEN PREHEADER TEXT -->
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">We're excited to have you get started. First, you need to confirm your account. </div>
      <table style="margin-bottom: 30px;" border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- LOGO -->
          <tr>
              <td bgcolor="#027aff" align="center">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#027aff" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                              <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src="https://raw.githubusercontent.com/ADG-VIT/IosFusion_Website2019/master/assets/ADG_logo_hr.png" width="125" height="120" style="display: block; border: 0px;" />
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td align="center" style="border-radius: 3px;" bgcolor="#027aff"><a href="https://adgrecruitments.herokuapp.com/user/get-verified/${uid._id}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; border: 1px solid #027aff; display: inline-block;">Confirm Account</a></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser: https://adgrecruitments.herokuapp.com/user/get-verified/${uid._id}</p><br><br>
                          </td>
                      </tr> <!-- COPY -->
                     
                      
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Cheers,<br>Team Apple Developers Group</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400;">
                              <p style="margin: 0;">This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.
                                  <br><br>Incase of any queries or discrepancies, please feel free to contact us at: <a href="mailto:appledevelopersgroup@gmail.com">appledevelopersgroup@gmail.com</a></p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                  <table bgcolor="#027aff" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-radius: 5px;">
                      <tr>
                          <td align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <h2 style="font-size: 20px; font-weight: 400; color: #FFFF; margin: 0;">Need more help?</h2>
                              <br>
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;" href="https://www.facebook.com/vitios/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/facebook-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>                            
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://www.linkedin.com/company/adgvit/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/linkedin-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://www.instagram.com/adgvit/" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/instagram-logo-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                              &emsp;
                              <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; display: inline-block;"  href="https://twitter.com/adgvit" target="_blank"><img src="https://raw.githubusercontent.com/ADG-VIT/ADG-Official-Website-2020/master/commonAssets/imgs/twitter-2-min.png" style="width: 18px; height: 18px; float: left; overflow: hidden;"></a>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  
  </html>`
};
 
mg.messages().send(data, function (error, body) {
  try{
          console.log('Email successfully sent!')
          res.status(200).send({
            message:"Email has been sent"
          })
  
        }
        catch(error){
          console.log(error);
         res.status(400).send({
           message: "Error in sending Email!"
  
       })
     
      }
});

  // const mailOptions = {
  //   from: process.env.EMAIL_ID,
  //   to: req.body.email,
  //   subject: 'Email Verification for ADG Recruitments 2020-2021',
  //   text: 'Click on the following link to verify your account\n ' + 'https://adgrecruitments.herokuapp.com/user/get-verified/' + uid._id
  // }

  // transporter.sendMail(mailOptions, (err,information) => {
  //   if(err){
  //   console.log(err)
  //   res.status(400).send({
  //     message: "Error in sending Email!"
  //   }) }
  //   else {
  //     console.log('Email successfully sent!')
  //     res.status(200).send({
  //       message:"Email has been sent"
  //     })
  //   }
  // })

  }
 
 
 module.exports ={
   signupFunction,
   loginFunction,
   getUserFunction,
   verifyEmail,
   updateUserFunction,
   passwordReset,
   updatePassword,
   resendverification
 }

