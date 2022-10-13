import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ErrorMessage, HttpStatus } from '../utils';
import { tokenRepo } from '../Repo';
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
      .send(ErrorMessage.AuthError_Message);
  }
  tokenRepo.getToken(token);
  next();
}
