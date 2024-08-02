import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.js";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(cookieParser());
const uri = 'mongodb://localhost:27017/mern-app'; // Ganti dengan string koneksi MongoDB Anda

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})