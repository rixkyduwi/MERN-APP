import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(bodyParser.json());

app.listen(5000, () => console.log("Server up and running..."));