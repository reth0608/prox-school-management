import express from "express";
import cors from "cors";
import routes from "./directions/schoolDir.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is working!");
});

app.use('/routes', routes);

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Server running on "+PORT);
});