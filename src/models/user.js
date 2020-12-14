const mongoose = require('mongoose')
const tQuestion = require('../models/questionTechnical')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    regno: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength:8
    },
    email:{
      type:String,
      required: true,
      unique: true,
      validate: [
        function(v) {
          var re = /^[a-zA-Z0-9.!#$%&'+=?^_`{​​​​|}​​​​~-]+@vitstudent.ac.in$/;
          return re.test(v)
      },
        'Please enter a valid VIT Email ID',
      ]
    },
    isEmailVerified:{
      type: Boolean,
      default: false
    },
    phone: 
    {
        type: String,
        validate: [
          function(v) {
            var re = /^[6-9]\d{9}$/;
            return re.test(v)
        },
          'Please enter a valid phone Number',
        ]
    },
    attemptedTechnical:
    {
      type:Boolean,
      default:false
    },
  attemptedManagement:
    {
      type:Boolean,
      default:false
    },
  attemptedDesign:   
    {
      type:Boolean,
      default:false
    },
  yearofstudy:{
    type:Number,
    default:1,
    required:true
  },
  responseTech:[{
    qid:String,
    response:String,
    projects:String,
    brief:String
  }],
  responseManagement:[
{
  qid:String,
  response:String
}
],
  
  responseDesign:[{
    qid:String,
    response:String
  }],
  githubLink: {
      type: String,
      validate: [
        function(v) {
          var re = /^https?:\/\/github.com\/[^\/]*\/?$/;
          return re.test(v)
      },
        'Please enter a valid GitHub Link',
      ],
    },
    /*userImage: {
      type: String,
      required: true,
      validate: /^data:image\/[^;]+;base64[^"]+$/
    },*/
  techscore:{
    type:Number,
    default:0
  },
  designscore:{
    type:Number,
    default:0
  },
  isAdmin:{
     type:Boolean,
     default:false
  }
  },{timestamps: true}
);

module.exports = mongoose.model('User', userSchema)



