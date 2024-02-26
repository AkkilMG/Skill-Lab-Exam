/**
 * 
 * @author: AkkilMG
 */

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongo from 'mongoose';
require('dotenv').config();
import { router as user } from "../controller/userController";


const app = express();

console.log(process.env.MONGODB)
mongo.Promise = Promise;
mongo.connect(process.env.MONGODB)
const db = mongo.connection
db.on('error', (error) => console.log("Check your mongodb please. There is an issue with mongodb."))
db.on('open', () => console.log("Mongodb is connected."))
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toString()}: ${req.method}=> ${req.originalUrl}`);
    next();
});

app.set('trust proxy', true);
app.use(bodyParser.json());

var server = http.createServer(app);

app.get("/", async(req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
    return
})

// // 
app.use("/auth", user)


server.listen(7000, () => console.log(`Server running at http://localhost:7000`));