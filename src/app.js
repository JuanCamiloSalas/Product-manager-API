const express = require("express");
const routes = require("./routes/index.js");
const cors = require("cors");
const morgan = require("morgan");

// Initialization
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Configurations
app.options('*', cors({
    allowedHeaders: ['x-auth-token']
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Route
app.use("/api", routes);

module.exports = app;