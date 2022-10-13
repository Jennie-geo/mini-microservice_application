import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';

import quoteRoute from './route/api.route';

dotenv.config();
const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', quoteRoute);

const Port = process.env.PORT;

app.listen(Port, () => console.log(`app listening on Port ${Port}`));
