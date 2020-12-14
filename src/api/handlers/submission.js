const questionTechnical = require('../../models/questionTechnical');
const questionDesign = require('../../models/questionDesign')
const questionManagement  = require('../../models/questionManagement')
const User = require('../../models/user')
const excelSheet = require('exceljs')

async function submitManagementFunction(req,res,next){
  
  try{
    var responses=req.body;
    if(await User.findOne({_id:req.user._id, responseManagement:[]})){
    //Check the question Id exists or not
    for(let i=0;i<responses.length;i++)
    {
    let questionVerify = await questionManagement.findById(responses[i].qid)
    if(!questionVerify){
      return res.status(400).send({
        message:"Question Credentials are wrong!"
      })
    } 
  } 
  await   User.findOneAndUpdate({_id:req.user._id},{responseManagement:responses},function(err,updated){
        if(err)
          console.log(err)
        else
        console.log(updated.responseManagement);
     })
     res.status(200).send({
      message:"Submission Successful."
    })
     }else {
       res.status(403).send({
         message:"You cannot submit the quiz more than once!"
       })
     }}
    catch(err)
    {
        res.status(500).send({
            message:"Error"
          })
    
    }
}

async function submitDesignFunction(req,res,next){
  try{
    var responses=req.body;
    var designscore=0;
    if(await User.findOne({_id:req.user._id, responseDesign:[]})){
    async function asyncForEach(responses){
        for(let i=0;i<responses.length;i++)
        {
            let q=await questionDesign.findById(responses[i].qid,function(err,result){
                if(err)
                console.log(err);
                else{
                return result}
            }).then()
            {
                console.log(q.correctOption);
                console.log(responses[i].response);
                // console.log(q.correctOption.localeCompare(responses[i].response))
                if(q.correctOption.localeCompare(responses[i].response)==0)
                {
                    designscore=designscore+1;
                    console.log("This is your design score: ",designscore)
                }
                
    
            }
        }
        console.log("This is your design score: ", designscore);
    } 

    await asyncForEach(responses)
    await   User.findByIdAndUpdate(req.user._id,{responseDesign:responses,designscore:designscore},function(err,updated){
          if(err)
          console.log(err)
          else{
            console.log(updated.responseDesign);
            console.log(updated.designscore);
          }
          
       })
       res.status(200).send({
        message:"Successful"
      })

    
    }else {
      res.status(403).send({
        message:"You cannot submit the quiz more than once!"
      })
    }}
    catch(err)
    {
        res.status(500).send({
          message:"Error"
          })
    
    }
    
   
  
  
  }

  async function submitTechnicalFunction(req,res,next){
      try{
    var responses=req.body;
    var techscore=0;
    if(await User.findOne({_id:req.user._id, responseTech:[]})){
    async function asyncForEach(responses){
        for(let i=0;i<responses.length;i++)
        {
            let q=await questionTechnical.findById(responses[i].qid,function(err,result){
                if(err)
                console.log(err);
                else
                return result
            }).then()
            {
                console.log(q.correctOption);
                console.log(responses[i].response);
                // console.log(q.correctOption.localeCompare(responses[i].response))
                if(q.correctOption.localeCompare(responses[i].response)==0)
                {
                    techscore=techscore+1;
                    console.log(techscore)
                }
                
    
            }
        }
        console.log(techscore);
    } 

    await asyncForEach(responses)
    await   User.findByIdAndUpdate(req.user._id,{responseTech:responses,techscore:techscore},function(err,updated){
          if(err)
          console.log(err)
          else{
            console.log(updated.responseTech);
            console.log(updated.techscore);
          }
          
       })
       res.status(200).send({
        message:"Successful"
      })

    
    }else {
      res.status(403).send({
        message:"You cannot submit the quiz more than once!"
      })
    }}
    catch(err)
    {
        res.status(500).send({
          message:"Error"
          })
    
    }
 
  
  }

  async function submitTech2Function(req,res,next){
    try{
      var response={projects:req.body.projects,brief:req.body.brief};
      if(await User.findOne({_id:req.user._id, responseTech:[]})){
        User.findByIdAndUpdate(req.user._id,{responseTech:response},function(err,updated){
          if(err)
          console.log(err)
          else{
            console.log(updated.responseTech);
          }
          res.status(200).send({
            message:"Successful"
          })
  
    })}
    else{
      res.status(403).send({
        message:"You cannot submit the quiz more than once!"
      })
  
    }

    }
  catch(err)
  {
      res.status(500).send({
        message:"Error"
        })
  
  }
}


//Create an Excel Sheet of all The Users
async function getExcelSheetResponses(req,res,next){
  try{

    //Get all Users
    const userData = await User.find({isAdmin: false})
    const workbook = new excelSheet.Workbook();
    const worksheetUsers = workbook.addWorksheet('Users Data');
    worksheetUsers.columns = [
      {header:'S_No',key:'S_No',width:10},
      {header:'name',key:'name',width:10},
      {header:'regno',key:'regno',width:10},
      {header:'email',key:'email',width:10},
      {header:'isEmailVerified',key:'isEmailVerified',width:10},
      {header:'phone',key:'phone',width:10},
      {header:'attemptedTechnical',key:'attemptedTechnical',width:10},
      {header:'attemptedManagement',key:'attemptedManagement',width:10},
      {header:'attemptedDesign',key:'attemptedDesign',width:10},
      {header:'yearofstudy',key:'yearofstudy',width:10},
      {header:'responseTech',key:'responseTech',width:20},
      {header:'responseManagement',key:'responseManagement',width:20},
      {header:'responseDesign',key:'responseDesign',width:20},
      {header:'githubLink',key:'githubLink',width:10},
      {header:'techscore',key:'techscore',width:10},
      {header:'designscore',key:'designscore',width:10}

    ];
      //Assign a serial number for every user
      let userCount = 1;
    userData.forEach(user => {
      (user).S_No = userCount;
      worksheetUsers.addRow(user)
      userCount += 1;
    })
    worksheetUsers.getRow(1).eachCell((cell) => {
      cell.font = {bold:true};
    });
    /*  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "UsersData.xlsx");  */
    const data = await workbook.xlsx.writeFile('UsersData.xlsx')
    res.status(201).send({
      message: "Excel File Created!"
    })
  } catch(err){
    res.status(500).send({
      message: "Error"
    })
  }
}


module.exports={
    submitManagementFunction,
    submitDesignFunction,
    submitTechnicalFunction,
    getExcelSheetResponses,
    submitTech2Function
}