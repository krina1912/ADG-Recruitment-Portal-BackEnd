const User = require('../../models/user')
const mQuestion=require('../../models/questionManagement')
const dQuestion=require('../../models/questionDesign');
const tQuestion = require('../../models/questionTechnical')

async function getAllManagementQuestionsFunction(req,res){
    console.log(req.user)
    try{
      mQuestion.find({},function(err,questions){
        console.log(questions);
        res.status(200).json({
            questions: questions
          })
      });

      
    } catch (err){
      res.status(500).send({
        success: false,
        message:"Error"
      })
    }
  }

  async function getAllDesignQuestionsFunction(req,res){
    console.log(req.user)
    try{
      dQuestion.find({},function(err,questions){
        console.log(questions);
          res.status(200).json({
            questions: questions
          })
        });
     
    } catch (err){
      res.status(500).send({
        success: false,
        message:"Error"
      })
    }
  }

//POST REQUEST TO CREATE QUESTIONS
async function createTechnicalQuestionFunction(req,res,next) {
const quizData = {
  ...req.body
};
try{
  const tQuiz = new tQuestion({
    ...quizData
  });
  await tQuiz.save();
  return res.status(201).send(tQuiz);
} catch(err){
  res.status(500).send({
    message:"Error"
  })
}
};

async function createManagementQuestionFunction(req,res,next) {
  const quizData = {
    ...req.body
  };
  try{
    const mQuiz = new mQuestion({
      ...quizData
    });
    await mQuiz.save();
    return res.status(201).send(mQuiz);
  } catch(err){
    res.status(500).send({
      message:"Error"
    })
  }
  };

  async function createDesignQuestionFunction(req,res,next) {
    const quizData = {
      ...req.body
    };
    try{
      const dQuiz = new dQuestion({
        ...quizData
      });
      await dQuiz.save();
      return res.status(201).send(dQuiz);
    } catch(err){
      res.status(500).send({
        message: "Error"
      })
    }
    };
    
  


//GET REQUEST TO GET ALL QUESTIONS
async function getAllTechnicalQuestionsFunction(req,res,next) {
  try{
    tQuestion.find({},function(err,questions){
      console.log(questions);
        
        res.status(200).json({
          questions: questions
        })
      });
  } catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}
//GET REQUEST TO GET SPECIFIC QUESTION
async function getSpecificTechnicalQuestionFunction(req,res,next){
  try{
    const questionId = req.params.questionId
    const tSpecificQuestion = await tQuestion.findById(questionId)
    if(!tSpecificQuestion){
      res.status(400).send({
        message: 'Question Id Wrong!'
      })
    } else{
      res.status(200).send(tSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}

/* //GET REQUEST TO GET QUESTIONS OF A CERTAIN YEAR AND DIFFICULTY LEVEL
async function getSpecificYearAndDifficultyTechnicalQuestionFunction(req,res,next){
  try{
    const yearofstudy = req.params.yearofstudy
    const difficultyLevel = req.params.difficultyLevel
    const tSpecificQuestion = await tQuestion.find({yearofstudy:yearofstudy, difficulty:difficultyLevel})
    if(!tSpecificQuestion){
      res.status(400).send({
        success: false,
        message: 'No questions available!'
      })
    } else{
      res.status(200).send(tSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      success: false,
      message: 'Failed'
    })
  }
}

async function getSpecificYearAndDifficultyDesignQuestionFunction(req,res,next){
  try{
    const yearofstudy = req.params.yearofstudy
    const difficultyLevel = req.params.difficultyLevel
    const dSpecificQuestion = await dQuestion.find({yearofstudy:yearofstudy, difficulty:difficultyLevel})
    if(!dSpecificQuestion){
      res.status(400).send({
        success: false,
        message: 'No questions available!'
      })
    } else{
      res.status(200).send(dSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      success: false,
      message: 'Failed'
    })
  }
}

async function getSpecificYearAndDifficultyManagementQuestionFunction(req,res,next){
  try{
    const yearofstudy = req.params.yearofstudy
    const difficultyLevel = req.params.difficultyLevel
    const mSpecificQuestion = await mQuestion.find({yearofstudy:yearofstudy, difficulty:difficultyLevel})
    if(!mSpecificQuestion){
      res.status(400).send({
        success: false,
        message: 'No questions available!'
      })
    } else{
      res.status(200).send(mSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      success: false,
      message: 'Failed'
    })
  }
}
 */

async function getSpecificManagementQuestionFunction(req,res,next){
  try{
    const questionId = req.params.questionId
    const mSpecificQuestion = await mQuestion.findById(questionId)
    if(!mSpecificQuestion){
      res.status(400).send({
        message: 'Question Id Wrong!'
      })
    } else{
      res.status(200).send(mSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}

async function getSpecificDesignQuestionFunction(req,res,next){
  try{
    const questionId = req.params.questionId
    const dSpecificQuestion = await dQuestion.findById(questionId)
    if(!dSpecificQuestion){
      res.status(400).send({
        message: 'Question Id Wrong!'
      })
    } else{
      res.status(200).send(dSpecificQuestion)
    }
  } catch(error){
    console.log(error)
    res.status(500).send({
      message: "Error"
    })
  }
}
//PUT REQUEST TO UPDATE QUESTION
async function updateSpecificTQuestionFunction(req,res,next) {
  try{
  const updateQuestion = req.params.questionId
  let questiontoBeUpdated = await tQuestion.findById(updateQuestion)
  if(!questiontoBeUpdated){
    res.status(400).send({
      message: "Question to be Updated Not Found!"
    })
  } else {
    questiontoBeUpdated.questionDescription = req.body.questionDescription;

    questiontoBeUpdated.options = req.body.options;

    questiontoBeUpdated.correctOption= req.body.correctOption;

    questiontoBeUpdated.questionImage= req.body.questionImage;

    questiontoBeUpdated.yearofstudy = req.body.yearofstudy;

    //questiontoBeUpdated.difficulty = req.body.difficulty;
    
    await questiontoBeUpdated.save();
    res.status(200).send(questiontoBeUpdated)
  }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

async function updateSpecificMQuestionFunction(req,res,next) {
  try{
  const updateQuestion = req.params.questionId
  let questiontoBeUpdated = await mQuestion.findById(updateQuestion)
  if(!questiontoBeUpdated){
    res.status(400).send({
      message: "Question to be Updated Not Found!"
    })
  } else {
    questiontoBeUpdated.description = req.body.description;


    questiontoBeUpdated.image= req.body.image;

    /* questiontoBeUpdated.yearofstudy = req.body.yearofstudy;

    questiontoBeUpdated.difficulty = req.body.difficulty; */
    
    await questiontoBeUpdated.save();
    res.status(200).send(questiontoBeUpdated)
  }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

async function updateSpecificDQuestionFunction(req,res,next) {
  try{
  const updateQuestion = req.params.questionId
  let questiontoBeUpdated = await dQuestion.findById(updateQuestion)
  if(!questiontoBeUpdated){
    res.status(400).send({
      message: "Question to be Updated Not Found!"
    })
  } else {
    questiontoBeUpdated.questionDescription = req.body.questionDescription;

    questiontoBeUpdated.options = req.body.options;

    questiontoBeUpdated.correctOption= req.body.correctOption;

    questiontoBeUpdated.questionImage= req.body.questionImage;

    questiontoBeUpdated.yearofstudy = req.body.yearofstudy;

    await questiontoBeUpdated.save();
    res.status(200).send({
      questiontoBeUpdated
    })
  }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}
//DELETE REQUEST TO DELETE QUESTION
async function deleteSpecificTQuestionFunction(req,res,next) {
  try{
    const deletedId = req.params.questionId;
    let questionDelete = await tQuestion.findByIdAndDelete(deletedId)
    if(!questionDelete){
      res.status(400).send({
        message: "Question does not Exist"
      })
    } else {
      res.status(200).send({
        message: "Question Deleted Successfully!"
      })
    }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

async function deleteSpecificMQuestionFunction(req,res,next) {
  try{
    const deletedId = req.params.questionId;
    let questionDelete = await mQuestion.findByIdAndDelete(deletedId)
    if(!questionDelete){
      res.status(400).send({
        message: "Question does not Exist"
      })
    } else {
      res.status(200).send({
        message: "Question Deleted Successfully!"
      })
    }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

async function deleteSpecificDQuestionFunction(req,res,next) {
  try{
    const deletedId = req.params.questionId;
    let questionDelete = await dQuestion.findByIdAndDelete(deletedId)
    if(!questionDelete){
      res.status(400).send({
        message: "Question does not Exist"
      })
    } else {
      res.status(200).send({
        message: "Question Deleted Successfully!"
      })
    }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

//GET REQUEST TO VIEW 10 QUESTIONS FROM THE SCHEMA IN A RANDOM MANNER

async function getRandomAllTechnicalQuestionsFunction(req,res,next) {
  try{
    //if the user's isAttempted has already been set to true then he cannot take the test again
    const attemptedTestAlready = await User.findOne({_id: req.user._id, attemptedTechnical: true})
    if(attemptedTestAlready){
      return res.status(400).send({
        message:"You have Already Taken this Test!"
      })
    } else {
    const tQuestions = await tQuestion.aggregate([  
      { $sample: {size: 10} }, 
      { $match:  {"yearofstudy": Number(req.params.yearOfStudy)} },
      {$project: {"correctOption":0}}
    ])
      console.log(tQuestions)
    User.findOneAndUpdate({_id: req.user._id},{attemptedTechnical:true},function(err,updateduser){
      if(err)
      console.log(err)
      else
      console.log(updateduser)
    });
    res.status(200).send(tQuestions)
  } }
  catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}

async function getRandomAllManagementQuestionsFunction(req,res,next) {
  try{
    const attemptedTestAlready = await User.findOne({_id: req.user._id, attemptedManagement: true})
    if(attemptedTestAlready){
      return res.status(400).send({
        message:"You have Already Taken this Test!"
      })
    } else {
    const mQuestions = await mQuestion.aggregate([{ $sample: { size: 10 } }]);
    User.findByIdAndUpdate(req.user._id,{attemptedManagement:true},function(err,updateduser){
      if(err)
      console.log(err)
      else
      console.log(updateduser)
    });
    res.status(200).send(mQuestions)
  } } 
  catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}
async function getRandomAllDesignQuestionsFunction(req,res,next) {
  try{
    const attemptedTestAlready = await User.findOne({_id: req.user._id, attemptedDesign: true})
    if(attemptedTestAlready){
      return res.status(400).send({
        message:"You have Already Taken this Test!"
      })
    } else {
    const dQuestions = await dQuestion.aggregate([  
      { $sample: {size: 10} }, 
      /* { $match:  {"yearofstudy": Number(req.params.yearOfStudy)} }, */
      {$project: {"correctOption":0}}
    ]);
    User.findByIdAndUpdate(req.user._id,{attemptedDesign:true},function(err,updateduser){
      if(err)
      console.log(err)
      else
      console.log(updateduser)
    });
    res.status(200).send(dQuestions)
  } }
  catch(error){
    res.status(500).send({
      message: 'Failed'
    })
  }
}

//cronjob
async function helloFunction(req,res,next){
  try{
    res.status(200).send({message:"Hello!"});
  }
  catch{
    res.status(500).send({message:"error"});
  }
}

module.exports ={
    getAllDesignQuestionsFunction,
    getAllManagementQuestionsFunction,
    createTechnicalQuestionFunction,
    createDesignQuestionFunction,
    createManagementQuestionFunction,
    getAllTechnicalQuestionsFunction,
    getSpecificTechnicalQuestionFunction,
    getSpecificManagementQuestionFunction,
    getSpecificDesignQuestionFunction,
    /* getSpecificYearAndDifficultyTechnicalQuestionFunction,
    getSpecificYearAndDifficultyDesignQuestionFunction,
    getSpecificYearAndDifficultyManagementQuestionFunction, */
    updateSpecificTQuestionFunction,
    updateSpecificDQuestionFunction,
    updateSpecificMQuestionFunction,
    deleteSpecificTQuestionFunction,
    deleteSpecificMQuestionFunction,
    deleteSpecificDQuestionFunction,
    getRandomAllTechnicalQuestionsFunction,
    getRandomAllManagementQuestionsFunction,
    getRandomAllDesignQuestionsFunction,
    helloFunction
  }



