import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import bodyparser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());

const DB = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_name
});

DB.connect((err)=>{
    if(err){
        console.error("Database couldn't be connected:", err);
        return;
    }else{
        console.log("Connection established");
    }
});

export default DB;