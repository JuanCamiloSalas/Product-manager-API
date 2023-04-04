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

// Routes
app.use("/api", routes);

module.exports = app;