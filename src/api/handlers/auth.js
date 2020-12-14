const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

//signup function
async function signupFunction(req,res,next) {
  //firstly salt the hashing for the password
  //genSalt is math.pow(2, value)
  const salt = await bcrypt.genSalt(10);
  //hash the password
  hashedpassword = await bcrypt.hash(req.body.password, salt)

  const emailAlreadyExists = await User.findOne({email: req.body.email})

  if(emailAlreadyExists){
    res.status(400).json({
      success: false,
      message:"This Email or Register Number Already exists!"
    })
  }

  const userData = {
    ...req.body,
    password: hashedpassword
  }
  if(userData.yearofstudy == 2 && userData.githubLink == undefined){
    return res.status(400).send({
      message:"For 2nd Years, Github Link is Compulsory!"
    })
  }
  const user = new User({
    ...userData
  })
  try{
    const userSignup = await user.save();

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
    const payload = {
      
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
    })
  }
  catch(err){
    res.status(400).send({
      message: "Error"
    })
  }
}

//Login Function

async function loginFunction(req,res,next) {
  //check whether register number exists
  const regNoExists = await User.findOne({regno: req.body.regno})
  if(!regNoExists){
    res.status(400).send({
      message: "Register Number is not found!"
    })
  }
  //compare the passwords
  const checkpassword = await bcrypt.compare(req.body.password, regNoExists.password)
  if(!checkpassword){
    res.status(403).send({
      message: "Password does not match!"
    })
  }
  // //check if email is verified
  // if(regNoExists.isEmailVerified == false ){
  //   return res.status(400).send({
  //     message: "Your email has not been verified yet!"
  //   })
  // } else {
    //create token and add it to the header file
  const token = jwt.sign({_id:regNoExists.id},process.env.JWT_KEY)
  res.header('auth-token',token).json({
    Token:token,
    message:"You have successfully logged in!"
  })
  
 
  /* if(isEmailVerified == false){
    res.status(401).send({
      message:'Email has not been verified yet'
    })
  } */
  //create token and add it to the header file
  /* const token = jwt.sign({_id:regNoExists.id},"secretkey")
  res.header('auth-token',token).json({
    Token:token,
    message:"You have successfully logged in!"
  }) */

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
    if(err){
      return res.status(400).send({
        message:"Error"
      })
    }
    return res.status(200).send({
      message:"Email has been successfully verified!"
    })
  })
}

module.exports ={
  signupFunction,
  loginFunction,
  getUserFunction,
  verifyEmail,
  updateUserFunction
}