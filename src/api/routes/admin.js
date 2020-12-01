const express= require("express");
const router = express.Router();
const checkAdmin = require('../middleware/checkAdmin')

const getmQuestion = require('../handlers/questions')
const getdQuestion = require('../handlers/questions')
const createTechnicalQuestion = require('../handlers/questions')
const createManagementQuestion = require('../handlers/questions')
const createDesignQuestion = require('../handlers/questions')
const getAllTechnicalQuestions = require('../handlers/questions')
const getSpecificTechnicalQuestion = require('../handlers/questions')
const getSpecificManagementQuestion = require('../handlers/questions')
const getSpecificDesignQuestion = require('../handlers/questions')
const updateSpecificTQuestion = require('../handlers/questions')
const updateSpecificDQuestion = require('../handlers/questions')
const updateSpecificMQuestion = require('../handlers/questions')
const deleteSpecificDQuestion = require('../handlers/questions')
const deleteSpecificMQuestion = require('../handlers/questions')
const deleteSpecificTQuestion = require('../handlers/questions')
const getYearDifficultyTQuestion = require('../handlers/questions')
const getYearDifficultyMQuestion = require('../handlers/questions')
const getYearDifficultyDQuestion = require('../handlers/questions')

const login = require('../handlers/admin-auth.js')


// const logout = require();
router.post('/login',login.loginAdminFunction);

//Management Questions
router.get('/management/get-all-questions',checkAdmin,getmQuestion.getAllManagementQuestionsFunction);
router.post('/management/add-question',checkAdmin,createManagementQuestion.createManagementQuestionFunction);
router.get('/management/get-specific-question/:questionId',checkAdmin,getSpecificManagementQuestion.getSpecificManagementQuestionFunction);
router.put('/management/update-question/:questionId',checkAdmin,updateSpecificMQuestion.updateSpecificMQuestionFunction)
router.delete('/management/delete-question/:questionId',checkAdmin,deleteSpecificMQuestion.deleteSpecificMQuestionFunction)
router.get('/management/get-specific-questions/:yearofstudy/:difficultyLevel',checkAdmin,getYearDifficultyMQuestion.getSpecificYearAndDifficultyManagementQuestionFunction)
//Design Questions
router.get('/design/get-all-questions',checkAdmin,getdQuestion.getAllDesignQuestionsFunction)
router.post('/design/add-question',checkAdmin,createDesignQuestion.createDesignQuestionFunction)
router.get('/design/get-specific-question/:questionId',checkAdmin,getSpecificDesignQuestion.getSpecificDesignQuestionFunction)
router.put('/design/update-question/:questionId',checkAdmin,updateSpecificDQuestion.updateSpecificDQuestionFunction)
router.delete('/design/delete-question/:questionId',checkAdmin,deleteSpecificDQuestion.deleteSpecificDQuestionFunction)
router.get('/design/get-specific-questions/:yearofstudy/:difficultyLevel',checkAdmin,getYearDifficultyDQuestion.getSpecificYearAndDifficultyDesignQuestionFunction)
//Technical Questions
router.post('/technical/add-question',checkAdmin,createTechnicalQuestion.createTechnicalQuestionFunction)
router.get('/technical/get-all-questions',checkAdmin,getAllTechnicalQuestions.getAllTechnicalQuestionsFunction)
router.get('/technical/get-specific-question/:questionId',checkAdmin,getSpecificTechnicalQuestion.getSpecificTechnicalQuestionFunction)
router.put('/technical/update-question/:questionId',checkAdmin,updateSpecificTQuestion.updateSpecificTQuestionFunction)
router.delete('/technical/delete-question/:questionId',checkAdmin,deleteSpecificTQuestion.deleteSpecificTQuestionFunction)
router.get('/technical/get-specific-questions/:yearofstudy/:difficultyLevel',checkAdmin,getYearDifficultyTQuestion.getAllTechnicalQuestionsFunction)



module.exports = router
