import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";
import { v4 } from "uuid";
import axios from "axios"

dotenv.config()

const init = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });
    passport.deserializeUser((id, done) => {
        done(null, sesssion.user)
    })
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI
    }, async (accessToken, refreshToken, profile, done) => {
        const user = {
            _id: v4(),
            googleID: profile.id,
            userName: profile.displayName,
            email: profile.email,
            profilePic: profile.photos.value,
            type: 'google',
            refreshToken
        }
        // data.user = user;
        let token = '';
            let response = await axios.get(`https://www.googleapis.com/drive/v3/files?pageSize=50&pageToken=${token}&orderBy=createdTime desc`, { headers: { Authorization: `Bearer ${accessToken}` }})
            response = await response.data
            token = response.nextPageToken;
            const newResp = response.files.filter((ele) => {
                if (ele.name == 'temp')
                    return ele;
            })
            console.log(newResp)
        done(null, user);
    }))
}
console.log(process.env.REDIRECT_URI)
export default init;