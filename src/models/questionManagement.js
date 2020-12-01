const mongoose = require("mongoose");
 
const mQuestionSchema = new mongoose.Schema({
    description:String,
    image:String
    // yearofstudy: {
    //     type: Number,
    //     required: [true, 'Please Specify which Year the questions are made for!']
    //   }
    // difficulty: {
    //     type: String,
    //     enum:['Easy','Medium','Hard'],
    //     required: [true,'Please Provide a Difficulty Level Amongst the Given Options']
    // }
});
 
module.exports = mongoose.model("mQuestion", mQuestionSchema);