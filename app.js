require('dotenv').config()
const express = require('express');
const { dbConnection } = require('./utils/dbConnection');
const userRouter = require('./routes/userRouter');
const { restrictTo } = require('./middlewares/Authentication');
const app = express();
const port = process.env.PORT || 5000

// Database Connection 
dbConnection();

// Middlewares 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routes 
app.use("/api/users", restrictTo(["NORMAL"]), userRouter);

// Server Listening
app.listen(port, () => console.log('> Server is up and running on : http://localhost:' + port))