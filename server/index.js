import express from "express";
import auth from "../server/Routes/auth.js";

const app = express()
app.use("/auth", auth);

app.listen(3000, () => {
    console.log("listening at http://localhost:3000");
})