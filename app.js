require('dotenv').config();
const express = require("express");
const { dbConnection } = require("./utils/dbConnection");
const app = express();
const path = require('path');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const ExpressError = require('./middlewares/ApiError');
const { checkForUserAuthentication, restrictTo } = require('./middlewares/checkForAuthentication');

// passportjs

const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const { passportConfiguration } = require('./config/passport');
const homeRouter = require('./routes/homeRoutes');



// Database Connection
dbConnection(process.env.MONGO_URL);

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForUserAuthentication);

// passportjs
app.use(session({
    secret: "superSecret",
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, collectionName: "session" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
passportConfiguration()
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', successRedirect: "/dashboard" }));

app.use("/api/users", userRouter);
app.use('/dashboard', restrictTo(["USER", "ADMIN"]), homeRouter)


// Pages which Doesn't Exists
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Internal Server Error" } = err;
    res.status(status).json({
        success: false,
        error: message,
    })
})

// Server Listening
app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});