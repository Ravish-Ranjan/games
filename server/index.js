import express from "express";
import auth from "../server/Routes/auth.js";
import cors from "cors";

const app = express()
app.use("/auth", auth);
app.use(cors())


app.listen(5000, () => {
    console.log("listening at http://localhost:5000");
})
