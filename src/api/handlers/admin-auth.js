const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


async function loginAdminFunction(req,res,next) {
  //check whether register number exists
  const emailExists = await User.findOne({email: req.body.email,isAdmin:true})
  if(!emailExists){
    res.status(400).send({
      message: "Email is not found!"
    })
  }
  //compare the passwords
  const checkpassword = await bcrypt.compare(req.body.password,emailExists.password)
  console.log(emailExists.password)
  if(!checkpassword){
    res.status(403).send({
      message: "Password does not match!"
    })
  }
  //create token and add it to the header file
  const token = jwt.sign({_id:emailExists.id},process.env.JWT_KEY)
  res.header('auth-token',token).json({
    Token:token,
    message:"You have successfully logged in!"
  })
}

module.exports ={
  loginAdminFunction
}

