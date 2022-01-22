const mongoose = require("mongoose");
 
const dQuestionSchema = new mongoose.Schema({
  questionDescription: {
    type: String,
    required: true
  },
  options: 
    {
      'a': {
        type: String,
        required: true
      },
      'b': {
        type: String,
        required: true
      },
      'c': {
        type: String,
        required: true
      },
      'd': {
        type: String,
        required: true
      },
      /*optionImage: {
        type: String,
        validate: /^data:image\/[^;]+;base64[^"]+$/
      }*/
    }
  ,
  correctOption: {
    type: String
  },
  questionImage: {
    type:String,
    validate: /^data:image\/[^;]+;base64[^"]+$/
  },
  //  yearofstudy: {
  //   type: Number,
  //   //required: [true, 'Please Specify which Year the questions are made for!']
  // } 
  difficulty: {
    type: String,
    enum:['Easy','Hard','Medium'],
    required: [true,'Please Provide a Difficulty Level Amongst the Given Options']
  }
  });
 
module.exports = mongoose.model("dQuestion", dQuestionSchema);