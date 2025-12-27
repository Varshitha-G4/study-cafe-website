const mongoose = require("mongoose");
const connect=mongoose.connect("mongodb://localhost:27017/project");

connect.then(()=>{
    console.log("Database for Reservation connected Successfully")
});

connect.catch(()=>{
    console.log("Database for Reservation failed to connect")
});


const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  numGuests: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
});

const Reservation = new mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
