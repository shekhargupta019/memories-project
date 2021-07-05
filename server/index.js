import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';// importing routes

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// this sets all the routes for post starting from /post url
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running On Port : ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);//make sure we dont get warning in console