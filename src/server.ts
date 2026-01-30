import express, { Response } from 'express'
import { config } from 'dotenv'
import { connectDB } from './db/connectDb';
import urlRouter from './routes/url.route';

config();

const app = express();
app.use(express.json());

app.use('/', urlRouter);

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


app.get('/', (req, res: Response) => {
    res.send('In the Home Page');
});

/**
 * 
 * 
 * @author 11Warrior
 * 
 * 
 */