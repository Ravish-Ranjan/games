import express from "express"
import passport from "passport";
import init from "../config/googleAuth.js";
import session from "express-session";
import dotenv from "dotenv";
import {connectToDb,getDb} from "../config/db.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import parseurl from 'parseurl'

const route = express.Router();
dotenv.config()
let db;
connectToDb((err) => {
    if (!err) {
        db = getDb()
    }
    else
        db = null
})

route.use(session({
    data : {},
    saveUninitialized: true,
    resave: true,
    secret : process.env.COOKIE_SECRET,
    cookie: {
        secure: true,
        maxAge : 24*60*60*1000
    },
    token : ''
}))
init();
route.use(passport.session())
route.use(passport.initialize())
route.use(cors())

route.get("/googlePermissions", passport.authenticate("google", {
    scope: ['profile','email']
}))
route.get("/google", passport.authenticate("google"), (req, res) => {
    const { userName, profilePic } = req.user;
    res.redirect(`http://localhost:3000?user=${userName}&dp=${profilePic}`)
})
route.get('/storeData/',async (req, res) => {
    console.log(req.session)
    res.status(200).json({})
})
export default route;