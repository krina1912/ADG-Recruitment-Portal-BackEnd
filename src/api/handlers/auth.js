const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

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
      message:"This Email Already exists!"
    })
  }

  const userData = {
    ...req.body,
    password: hashedpassword
  }
  if(userData.yearofstudy == 2 && userData.githubLink == undefined){
    return res.status(400).send({
      success: false,
      message:"For 2nd Years, Github Link is Compulsory!"
    })
  }
  const user = new User({
    ...userData
  })
  try{
    const userSignup = await user.save();
    const payload = {
      user:{
        id: userSignup.id
      }
    };
    //creating jwt token
    jwt.sign(payload,process.env.JWT_KEY,{expiresIn: 10000},(err,token) => {
      if(err){
        res.status(500).send(err);
      }
      res.status(200).json({
        token,
        userSignup
      })
    })
  }
  catch(err){
    res.status(400).send({
      message: "error"
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
  //create token and add it to the header file
  const token = jwt.sign({_id:regNoExists.id},process.env.JWT_KEY)
  res.header('auth-token',token).json({
    Token:token,
    message:"You have successfully logged in!"
  })
}

async function getUserFunction(req,res){
  console.log(req.user)
  try{
    const user = await User.findById(req.user._id);
    res.status(200).json({
      userDetails: user
    })
  } catch (err){
    res.status(500).send({
      message:"Error in finding the user!"
    })
  }
}


module.exports ={
  signupFunction,
  loginFunction,
  getUserFunction
}