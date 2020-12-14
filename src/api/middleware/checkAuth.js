const jwt = require("jsonwebtoken")
require('dotenv/config')

module.exports = (req,res,next) => {
  const token = req.header("auth-token")
  if(!token){
    res.status(401).send({
      message:"Auth Failed!"
    })
  }

  try{
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded
      console.log(decoded)
      next();
  }
  catch(error){
    console.error(error)
    return res.status(401).json({
      message: "Token Invalid!"
    })
  }
}
