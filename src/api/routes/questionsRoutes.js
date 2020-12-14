const express= require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth')

const getRandomAllManagementQuestions = require('../handlers/questions')
const getRandomAllDesignQuestions = require('../handlers/questions')
const getRandomAllTechnicalQuestions = require('../handlers/questions')


//Management Questions
router.get('/management/get-quiz-questions/:device',checkAuth,getRandomAllManagementQuestions.getRandomAllManagementQuestionsFunction)

//Design Questions
router.get('/design/get-quiz-questions/:device',checkAuth,getRandomAllDesignQuestions.getRandomAllDesignQuestionsFunction)

//Technical Questions
router.get('/technical/get-quiz-questions/:yearOfStudy/:device',checkAuth,getRandomAllTechnicalQuestions.getRandomAllTechnicalQuestionsFunction)


module.exports = router