import express from 'express';
import apiRouter from './routes/api.route';
import logger from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', apiRouter);
const Port = process.env.PORT;

app.listen(Port, () => console.log(`Server running on port ${Port}`));
