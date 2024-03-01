import express from "express"
import passport from "passport";
import init from "../config/googleAuth.js";
import session from "express-session";
import dotenv from "dotenv";


const route = express.Router();
dotenv.config()

route.use(session({
    data : {},
    saveUninitialized: true,
    resave: true,
    secret : process.env.COOKIE_SECRET,
    cookie: {
        secure: true,
        maxAge : 24*60*60*1000
    }
}))
init();
route.use(passport.session())
route.use(passport.initialize())

route.get("/googlePermissions", passport.authenticate("google", {
    scope: ['profile','email','https://www.googleapis.com/auth/drive']
}))
route.get("/google", passport.authenticate("google"), (req, res) => {
    res.status(200).json({ id: req.id });
})

export default route;