import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenService } from '../services/tokenService';
import dotenv from 'dotenv';
import { HttpStatus } from '../utils';
dotenv.config();

export function authlogin(
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  const token =
    req.headers['authorization'] || (req.query.authorization as string);
  if (!token) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .send('You have to login to continue');
  }
  const tokenBody = token.slice(7);

  jwt.verify(tokenBody, process.env.SECRET as string, async (err, decoded) => {
    if (err) {
      return res.status(HttpStatus.FORBIDDEN).send({ Error: 'Access denied' });
    } else {
      const { userId } = decoded as {
        userId: string;
        iat: number;
        exp: number;
      };
      const user = TokenService.findById(userId);
      console.log(user);
      if (user == null) {
        return res.send({ login: `No User exists with this ${userId}` });
      }
      next();
    }
  });
}
