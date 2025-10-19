import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { createConnection } from './utils/db/connection.js';
import { indexRoute } from './api/routes/index.js';

const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use('/api',indexRoute);
const promise=createConnection();
promise.then(()=>{
    console.log(chalk.green('Connected to MongoDB'));
    const server=app.listen(process.env.PORT,(err)=>{
        if(err){
            console.log(chalk.red("error starting server,",err));
        }
        else{
            console.log(chalk.green(`Server started on port ${process.env.PORT}`));
        }
})
}).catch((error)=>{
    console.log(chalk.red('Error connecting to MongoDB:',error));
});