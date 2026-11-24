const express=require("express")
const mongoose=require('mongoose')
const session=require('express-session')
const app=express()

app.set("view engine","hbs")

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use("/uploads",express.static("uploads"))


app.use(session({
    secret:"mysecretkey",
    resave:false,
    saveUninitialized:false
}))

mongoose.connect("mongodb://localhost:27017/netflix")
.then(()=>
{
    console.log("connected")
})
.catch(()=>
{
    console.log("connection interrupted")
})
app.use('/user',require('./router/userRouter'))

app.use('/movie',require('./router/movie'))

app.listen(3000,()=>
{
    console.log("Server is listening to port 3000")
})