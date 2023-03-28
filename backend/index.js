import express from "express";
import cors from "cors";
import db from "./config/database.js";
import users from "./models/UserModel.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log("Database connected.....tod");
    await users.sync();
} catch (error) {
    console.error(error);
}
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000,()=> console.log("Server Is Running http://127.0.0.1:5000"));

