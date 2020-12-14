const express= require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth')

const signup = require('../handlers/auth');
const login = require('../handlers/auth')
const getUser = require('../handlers/auth')
const updateUser = require('../handlers/auth')
const emailVerify = require('../handlers/auth')
const submit= require('../handlers/submission.js')
const cronjob=require('../handlers/questions.js')
// const logout = require();

//signup
router.post('/signup', signup.signupFunction)

//login
router.post('/login',login.loginFunction)

//get the user
router.get('/getuser',checkAuth,getUser.getUserFunction)

//edit the user profile
router.put('/updateuser',checkAuth,updateUser.updateUserFunction)

//email verification
router.get('/get-verified/:userId',emailVerify.verifyEmail )

//submission
router.post('/management/submit',checkAuth,submit.submitManagementFunction);
router.post('/design/submit',checkAuth,submit.submitDesignFunction);
router.post('/technical/submit',checkAuth,submit.submitTechnicalFunction);
router.post('/technical2/submit',checkAuth,submit.submitTech2Function);

//CRON-JOB
router.get('/hello',cronjob.helloFunction);


module.exports = router



