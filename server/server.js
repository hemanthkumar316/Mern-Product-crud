const express=require('express')
const dotenev=require('dotenv')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
app.use(cors())
const productrouter=require('./routes/routes')
dotenev.config({path:'./config/.env'})
const port=process.env.port
const mongo=process.env.MONGO_URL
app.use(express.json())
app.use(express.urlencoded({extended :false}))
mongoose.connect(mongo,{
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(console.log('mongodb is connected successfully'))
.catch((err)=>console.log(err))
app.use('/task',productrouter)
app.listen(port,(err)=>{
  if(err) throw err
  console.log(`server is runing on port number ${port}`)
})