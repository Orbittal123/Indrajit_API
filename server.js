import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./routes/route.js";
import cookieParser from "cookie-parser";
import path from 'path';

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join('images')));

app.use(
  cors({
    origin: ["http://10.5.0.20:3000", "http://10.5.0.20:3001"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', 'http://10.5.0.20:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  next(); });




app.use("/api", Routes);
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => console.log("Listening on port", PORT)); // Fixed the log message

 
