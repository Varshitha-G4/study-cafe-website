const mongoose = require("mongoose")
const connect=mongoose.connect("mongodb://localhost:27017/project");

connect.then(()=>{
    console.log("Database connected Successfully")
});

connect.catch(()=>{
    console.log("Databased failed to connect")
});

const LoginSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const collection = new mongoose.model("logindetails",LoginSchema)

module.exports=collection;

