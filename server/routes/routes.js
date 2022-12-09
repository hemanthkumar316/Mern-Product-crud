const express=require('express')
const router=express.Router()
const Product=require('../Models/productschema')

//create product
router.post('/products',async(req,res)=>{
 try{
  const newproduct=new Product({
   name:req.body.name,
   price:req.body.price,
   qty:req.body.qty
  })
  console.log(newproduct)
  const saveproduct=await newproduct.save() 
 res.status(200).json({result:'product is added',saveproduct})
 }
 catch(err){
  res.status(500).json(err)
  console.log(err)
 }
})

//delete product
 router.delete('/products/:id',async(req,res)=>{
 try{
  let productid=req.params.id
  productname= await Product.findByIdAndDelete(productid)
  res.status(200).json({result:'product is deleted'})
 }
 catch(err){
  console.log(err)
  return  res.status(500).json(err)
 }
})

//get all products
router.get('/products',async(req,res)=>{
 try{
  let products=await Product.find()
  res.status(200).json(products)
 }
 catch(err){
  console.log(err)
  res.status(500).json({
   msg:err.message
  })
 }
})

//create single product
router.get('/products/:id',async(req,res)=>{
 try{
  let productid=req.params.id
  let  product=await Product.findById(productid)
  res.status(200).json(product)
 }
 catch(err){
  console.log(err)
  res.status(500).json({
   msg:err.message
  })
 }
})

//update product

router.put('/products/:id',async(req,res)=>{
 let productid=req.params.id
 try{
  let updatedproduct={
   name:req.body.name,
   price:req.body.price,
   qty:req.body.qty
  }
  //product is exists or not
  let product=await Product.findById(productid)
  if(!product){
   return res.status(401).json({
    msg:'NOt Product found'
   })
  }
  //update
  product=await Product.findByIdAndUpdate(productid,{
$set:updatedproduct
  },{new:true})
  res.status(200).json({
   result:"product is updated",
   product:product
  })
  
 }
 catch(err){
  console.log(err)
  res.status(500).json({
   msg:err.message
  })
 }
})

module.exports=router