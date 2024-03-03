import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";
import { v4 } from "uuid";
import axios from "axios"
import { createReadStream } from "fs"

dotenv.config()

const init = () => {
    passport.serializeUser((user, done) => {
        done(null, { id: user.id, token: user.token })
    });
    passport.deserializeUser(async (info, done) => {
        let response = await axios.get(`https://www.googleapis.com/drive/v2/files/${info.id}?alt=media`, { headers: { Authorization: `Bearer ${info.token}` } })
        response = await response.data
        done(null,response)
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

        //create folder
        let response = await axios.post(`https://www.googleapis.com/drive/v3/files`, { name: 'games', mimeType: 'application/vnd.google-apps.folder' }, { headers: { Authorization: `Bearer ${accessToken}` } })
        response = await response.data
        if (response.id) {
            let file_resp = await axios.post(`https://www.googleapis.com/drive/v3/files`, { name: 'init.json', mimeType: 'application/json', parents: [response.id] }, { headers: { Authorization: `Bearer ${accessToken}` } })
            file_resp = await file_resp.data

            let file_content = await axios.put(`https://www.googleapis.com/upload/drive/v2/files/${file_resp.id}`, user, { headers: { Authorization: `Bearer ${accessToken}` } })
            file_content = await file_content.data;
            // console.log(file_content.id)
            if (file_content.id)
                done(null, { ...user, id: file_content.id, token: accessToken ,parentId : response.id});
        }
    }))
}
console.log(process.env.REDIRECT_URI)
export default init;