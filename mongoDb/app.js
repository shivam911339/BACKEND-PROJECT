const express=require("express");
// import './style.css'
const bodyParser=require("body-parser");
const app=express()
const Student=require("./connect");
const encoded=bodyParser.urlencoded({extended:false})
app.use(express.static(__dirname))
app.get('/dashboard',(req,res)=>
{
    res.sendFile(__dirname+"/Home.html");
})
app.get('/signup',(req,res)=>
{
    res.sendFile(__dirname+"/signup.html");
})

app.post('/signup',encoded,async(req,res)=>
{
    let data=await Student(req.body)
    data.save()
    .then(()=>{
        res.send(
            `<h2>Registration is Successfull.</h2>
            <p> click here to <a href="./signin"> LOGIN </a></p>`
        )
    })
    .catch((err)=>
{
    console.log("Error while saving information to mongoDb");
    console.log(err);
})

})


app.post("/signin",(req,res)=>{
    res.sendFile(__dirname+"/signIn.html");
})

app.post("/loggedin",encoded,async(req,res)=>
{
    const userName=req.body.username;
    const password1=req.body.password;
    Student.findOne({name:userName,password:password1})
    .then(std=>{
    if (std)
    {
        res.redirect("/dashboard");
    }
    else
    {
        res.status(400).send("Invalid username and password");
    }
   
})
.catch(error=>{
    console.error(error);
    res.status(400).send("Internal server error")
})

});
app.get('/dashboard',(req,res)=>
{
    res.sendFile(__dirname+"Home.html");
})
app.listen(5000,()=>
{
    console.log("Server started at server : 5000")
})

