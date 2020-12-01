const questionTechnical = require('../../models/questionTechnical');
const User = require('../../models/user')

async function submitManagementFunction(req,res,next){
  
  try{
    var responses=req.body;
  await   User.findByIdAndUpdate(req.user._id,{responseManagement:responses},function(err,updated){
        if(err)
        console.log(err)
        else
        console.log(updated.responseManagement);
     })
     res.status(200).send({
        message:"Submission Successful."
      })

    }
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
    
    await   User.findByIdAndUpdate(req.user._id,{responseDesign:responses},function(err,updated){
          if(err)
          console.log(err)
          else
          console.log(updated.responseDesign);
       })
       res.status(200).send({
        message:"Submission Successful."
      })

    }
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



//   responses.forEach(async x => {
//         let q=await questionTechnical.findById(x.qid,function(err,result){
//             if(err)
//             console.log(err);
//             else
//             return result
//         }).then()
//         {
//             console.log(q.correctOption);
//             console.log(x.response);
//             console.log(q.correctOption.localeCompare(x.response))
//             if(q.correctOption.localeCompare(x.response)==0)
//             {
//                 techscore=techscore+1;
//                 console.log(techscore)
//             }
            

//         }
              
//     })

    await asyncForEach(responses)
    await   User.findByIdAndUpdate(req.user._id,{responseTech:responses,techscore:techscore},function(err,updated){
          if(err)
          console.log(err)
          else{
            console.log(updated.responseTech);
            console.log(updated.techscore);
          }
          
       })
       res.status(500).send({
        message:"Successful"
      })

    
    }
    catch(err)
    {
        res.status(500).send({
            message:"Error"
          })
    
    }
 
  
  }


module.exports={
    submitManagementFunction,
    submitDesignFunction,
    submitTechnicalFunction
}