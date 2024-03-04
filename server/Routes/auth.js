import express from "express"
import passport from "passport";
import init from "../config/googleAuth.js";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors"
import jwt from "jsonwebtoken"


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
route.use(cors())

route.get("/googlePermissions", passport.authenticate("google", {
    scope: ['profile','email','http s://www.googleapis.com/auth/drive']
}))
route.get("/google", passport.authenticate("google"), (req, res) => {
    const { id } = req.user;
    let newId = jwt.sign(id, process.env.SIGN)
    console.log(id)
    res.redirect(`http://localhost:3000?token=${newId}`)
})
route.get("/data/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    res.status(200).json(req.session.info);
})
export default route;