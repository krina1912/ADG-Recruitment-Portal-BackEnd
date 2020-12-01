const mongoose = require("mongoose");
 
const responseSchema = new mongoose.Schema({
    qid:String,
    mcqAns:String,
    subAns:String,
});
 
module.exports = mongoose.model("Response", responseSchema);
