const mongoose = require("mongoose");
 
const responseSchema = new mongoose.Schema({
   status:Boolean
});
 
module.exports = mongoose.model("Response", responseSchema);
