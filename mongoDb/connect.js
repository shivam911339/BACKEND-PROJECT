const { default: mongoose } = require("mongoose");
const moongoose=require("mongoose");
moongoose.connect('mongodb://localhost:27017/CampusConnect')

.then(()=>
{
    console.log("connection is successful");
})
.catch((err)=>
{
    console.log("Error in connection");
})

const signup=new mongoose.Schema({

    name:
    {
        type:String,
        require:true,
        trim:true
    },
    age:
    {
        type:String,
        require:true,
        trim:true
    },
    email:
    {
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    phno:
    {
        type:String,
        require:true,
        trim:true
    },
    gender:
    {
        type:String,
        require:true,
        trim:true
    },
    password:
    {
        type:String,
        require:true,
        trim:true
    }

})

const student=moongoose.model('signup',signup)
module.exports=student;
