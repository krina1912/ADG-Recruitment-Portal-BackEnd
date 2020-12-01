const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

const userRoutes = require("./routes/user.js")
const qRoutes=require("./routes/questionsRoutes.js")
const adminRoutes=require("./routes/admin.js")


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//User Routes
app.use('/user',userRoutes)
app.use('/questions',qRoutes)
app.use('/admin',adminRoutes)

//app.use('/admin',adminRoutes)
//app.use('/submissions',submissionRoutes);

//error handling
app.use((err, req, res, next) => {
  console.log(err);
  if (typeof err == 'string') {
    return res.status(400).send({
      message: err,
    });
  }
  return res.status(400).send({
    message: err.message,
  });
});



module.exports = app;