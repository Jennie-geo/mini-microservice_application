import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import {
  userSignupDetails,
  userLoginDetail,
} from '../validation/userdetails.validation';
import { userService } from '../services/userService';
import { ErrorMessage, HttpStatus } from '../utils';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validation = userLoginDetail.validate(req.body);
    if (validation.error)
      return res.send({ 'validation error ': validation.error.message });
    const { email, password } = req.body;
    console.log('REQUESTING: ', req.body);
    const user = userService.findByEmail(email);

    if (user == null) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ errormessage: ErrorMessage.INVALID_EMAIL });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, errorMessage: ErrorMessage.INVALID_PASSWORD });
    }
    console.log(user.email, user.password);
    const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_KEY as string,
      { expiresIn: '1hr' },
    );
    res.setHeader('Authorization', token);
    return res
      .status(HttpStatus.OK)
      .json({ success: true, successMessage: 'Auth Successful', token: token });
  } catch (err) {
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ success: false, errorMessage: ErrorMessage.SERVER_ERROR });
  }
};

export const signupUser = async (req: Request, res: Response) => {
  try {
    const validation = userSignupDetails.validate(req.body);
    if (validation.error) {
      return res.send({ 'Validation error': validation.error.message });
    }
    const { firstName, lastName, email, password } = req.body;
    if (userService.emailExists(email)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ errorMessage: ErrorMessage.EMAIL_EXIST });
    }
    const hashPassword = await bcrypt.hash(password, 8);

    const newUser = {
      id: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    };
    return res.status(HttpStatus.CREATED).json(userService.createUser(newUser));
  } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};
