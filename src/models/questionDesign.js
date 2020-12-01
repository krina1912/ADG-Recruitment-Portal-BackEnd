const mongoose = require("mongoose");
 
const dQuestionSchema = new mongoose.Schema({
    description:String,
    image:String,
    yearofstudy: {
        type: Number
      }
      // difficulty: {
      //   type: String,
      //   enum:['Easy','Hard','Medium'],
      //   required: [true,'Please Provide a Difficulty Level Amongst the Given Options'],
      // }
});
 
module.exports = mongoose.model("dQuestion", dQuestionSchema);