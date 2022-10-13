import { Request, Response } from 'express';
import { writeFileSync, readFileSync } from 'fs';
import axios from 'axios';
import { HttpStatus } from '../utils';
import dotenv from 'dotenv';
import { TokenService } from '../services/tokenService';
dotenv.config();

const QUOTES_API = 'https://type.fit/api/quotes';

export const apiRequest = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(QUOTES_API);

    const data = JSON.stringify(response.data, null, 2);
    writeFileSync('./quotes.json', data);

    const jsonData = readFileSync('./quotes.json', 'utf8');

    const parseData = JSON.parse(jsonData);

    const randomTarget =
      parseData[Math.floor(Math.random() * parseData.length)];

    const { text, author } = randomTarget;
    if (!text && !author) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, errorMessage: 'No quotes found.' });
    }
    return res.status(HttpStatus.OK).json({ quotes: `${text} ${author}` });
  } catch (error: any) {
    return res.status(HttpStatus.SERVER_ERROR).json(error.message);
  }
};

export const checkUserAuth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userDetail = await axios.post('http://localhost:3111/api/v1/user', {
      email: email,
      password: password,
    });
    const token = userDetail.data.token;
    return res
      .status(HttpStatus.CREATED)
      .json({ token: TokenService.createToken(token) });
  } catch (error: any) {
    console.log('Error', error.message);
  }
};
