import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './db/connectDb';

config();

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

/**
 * 
 * 
 * @author 11Warrior
 * 
 * 
 */