const express= require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth')

const getRandomAllManagementQuestions = require('../handlers/questions')
const getRandomAllDesignQuestions = require('../handlers/questions')
const getRandomAllTechnicalQuestions = require('../handlers/questions')


//Management Questions
router.get('/management/get-random-questions',checkAuth,getRandomAllManagementQuestions.getRandomAllManagementQuestionsFunction)

//Design Questions
router.get('/design/get-random-questions',checkAuth,getRandomAllDesignQuestions.getRandomAllDesignQuestionsFunction)

//Technical Questions
router.get('/technical/get-random-questions',checkAuth,getRandomAllTechnicalQuestions.getRandomAllTechnicalQuestionsFunction)


module.exports = router