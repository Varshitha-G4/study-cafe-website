const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const Reservation = require("./reserve-backend");
const Contactus = require("./contactus-backend");

const app = express();

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "src", "views"));
app.set("views", path.join(__dirname, "views"));

// Serve static files (images, styles, etc.) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Render the home page
app.get("/", (req, res) => {
  // const reservationMessage = req.query.message || null; // Get the message from the query string
  // res.render("home", { reservationMessage: message }); // Pass it to the EJS template
  res.render("home");
});

// Render login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Render signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/review", (req, res) => {
  res.render("review");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});

app.get("/reserve", (req, res) => {
  res.render("reservation");
});

app.get("/contactus", (req, res) => {
  res.render("contactus");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/pomo", (req, res) => {
  res.render("pomodoro");
});

// Signup route
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  try {
    // Check if the user already exists
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
      return res.send("Username already exists!");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    // Insert the new user into the database
    const userdata = await collection.create(data); // Use create instead of insertMany since its mongoose
    console.log("User inserted:", userdata);
    // Redirect to login page after successful signup
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Error during signup.");
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      return res.send("Username doesn't exist");
    }

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatched) {
      res.render("home");
    } else {
      res.send("Password is incorrect");
    }
  } catch (error) {
    console.error(error);
    res.send("Wrong details");
  }
});

app.post("/reserve", async (req, res) => {
  const reservedData = {
    name: req.body.name,
    phone: req.body.phone,
    numGuests: req.body.numGuests,
    date: new Date(req.body.date),
    time: req.body.time,
    message: req.body.message,
  };

  try {
    const storeReserveData = await Reservation.create(reservedData);
    console.log("Data stored:", storeReserveData);
    res.redirect("/?message=Reservation made successfully!");
  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).send("Error during reservation.");
  }
});

app.post("/contactus", async (req, res) => {
  const contactusData = {
    name: req.body.name,
    Email: req.body.email,
    Subject: req.body.Subject, // Ensure this matches the input name
    message: req.body.message,
  };

  try {
    const storedata = await Contactus.create(contactusData); // Use the Contactus model
    console.log("Contact data stored:", storedata);
    res.redirect("/?message=Contact request submitted successfully!"); // Redirect after submission
  } catch (error) {
    console.error("Contact Us error:", error);
    res.status(500).send("Error during contact request.");
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
