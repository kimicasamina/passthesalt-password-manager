import Joi from 'joi';

export const folderSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Folder name is required',
    'string.min': 'Folder name should have a minimum length of 3 characters',
    'string.max': 'Folder name can be at most 50 characters long',
  }),
});

