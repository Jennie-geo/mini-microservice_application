import Joi from 'joi';

export const userSignupDetails = Joi.object({
  firstName: Joi.string().trim().min(3).max(30).required().label('First Name'),
  lastName: Joi.string().trim().min(3).max(30).required().label('Last Name'),
  email: Joi.string()
    .label('Email')
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .label('Password')
    .required()
    .trim()
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
    ),
});

export const userLoginDetail = Joi.object({
  email: Joi.string()
    .trim()
    .label('Email')
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .label('Password')
    .trim()
    .required()
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
    ),
});
