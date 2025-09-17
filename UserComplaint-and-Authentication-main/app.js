if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const pageRouter = require('./routes/pageRoutes');
const complaintsRouter = require("./routes/complaints");
const ejsEngine = require("ejs-mate");

const app = express();

const authRouter = require('./routes/authRoutes');
const staffAuthRouter = require('./routes/staffAuthRoutes');

const session = require('express-session');



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',  // use env var
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // true if using https
}));


// EJS setup
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
// app.use('/api/v1/users', authRouter);  // API (for JSON / Postman / frontend apps)
app.use('/users', authRouter);         // Web form submissions
app.use('/staff', staffAuthRouter);
app.use('/', pageRouter);
app.use("/complaints", complaintsRouter);

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB connected"))
.catch(err => console.error(" MongoDB error:", err));

// Root
app.get("/", (req, res) => {
  res.send("Complaint System API Running ");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));








