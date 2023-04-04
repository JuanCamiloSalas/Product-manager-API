const express = require("express");
const routes = require("./routes/index.js");
const cors = require("cors");
const morgan = require("morgan");

// Initializations
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

module.exports = app;