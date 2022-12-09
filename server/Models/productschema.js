const mongoose=require('mongoose')
const Product=new mongoose.Schema({
 name:{
  type:String,
  required:true
 },
 price:{
  type:String,
  required:true
 },
 qty:{
  type:Number,
  required:true
 }

})
module.exports=mongoose.model("productitems",Product)