const mongoose = require("mongoose");
const conn=mongoose.connect("mongodb://localhost:27017/project");

conn.then(()=>{
    console.log("Database for Contact connected Successfully")
});

conn.catch(()=>{
    console.log("Database for Contact failed to connect")
});
const ContactusSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        default:"",
    },

})
const Contactus=new mongoose.model("Contact us",ContactusSchema);
module.exports=Contactus;