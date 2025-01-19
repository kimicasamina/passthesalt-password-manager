import Joi from 'joi';

export const loginSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name should be a string',
    'any.empty': 'Name is required',
    'string.min': 'Name should have a minimum length of 3 characters',
    'string.max': 'Name can be at most 50 characters long',
  }),
  username: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username can be up to 30 characters long',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
  //   website: Joi.string().messages({

  //   }),
  folder_id: Joi.required().messages({
    'any.required': 'Id is required',
  }),
});

// export const idParamsSchema = Joi.object({
//   id: Joi.string().required().message({
//     'string.emtpy': 'Id is required',
//   }),
// });
// ({
//     name: Joi.string().min(3).max(50).required().messages({
//       'string.empty': 'Folder name is required',
//       'string.min': 'Folder name should have a minimum length of 3 characters',
//       'string.max': 'Folder name can be at most 50 characters long',
//     })
