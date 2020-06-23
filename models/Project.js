const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const projectSchema  = new Schema ({
  name: {type: String, required: true},
  img: String,
  subtitle:String,
  techs:[{type:String}],
  mainText:String,
  img:String,
  link:String,
  media:[{type:String}],
  gitHub:{
      frontend:{type:String},
      backend:{type:String},
      repository:{type:String}
  }
})

const Project = mongoose.model("Project", projectSchema)

module.exports = Project