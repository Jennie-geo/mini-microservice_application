import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenService } from '../services/tokenService';
import dotenv from 'dotenv';
dotenv.config();

export function authlogin(
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  const token =
    req.headers['authorization'] || (req.query.authorization as string);
  if (!token) {
    return res.status(403).send('You have to login to continue');
  }
  const tokenBody = token.slice(7);

  jwt.verify(tokenBody, process.env.SECRET as string, async (err, decoded) => {
    if (err) {
      return res.status(403).send({ Error: 'Access denied' });
    } else {
      const { userId } = decoded as {
        userId: string;
        iat: number;
        exp: number;
      };
      const user = TokenService.findById(userId);
      if (user == null) {
        return res.send({ login: `No User exists with this ${userId}` });
      }
      next();
    }
  });
}
