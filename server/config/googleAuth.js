import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";
import {connectToDb,getDb} from "../config/db.js"


dotenv.config()

const init = async () => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });
    passport.deserializeUser( id => {
        db.collection("UserData").findOne({ _id: id }).then(result => {
            if (result)
                done(null, result)
            else
                done('user not found')
        })
    })
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI
    }, async (accessToken, refreshToken, profile, done) => {
        const user = {
            googleID: profile.id,
            userName: profile.displayName,
            email: profile.email,
            profilePic: profile.photos[0].value,
            type: 'google',
            refreshToken
        }
        let db;
        connectToDb((err) => {
            if (!err) {
                db = getDb()
                db.collection("UserData").findOne({ googleID: profile.id }).then(result => {
                    if (!result) {
                        db.collection("UserData").insertOne(user).then(result=>{{
                            if (result)
                                done(null, user)
                            else
                                done("Invalid request");
                        }
                        }).catch(err => {
                            done('database error');
                        })
                    }
                    else {
                        done(null, result);
                    }
                })
            }
            else
                db = null;
        })
    }))
}
export default init;