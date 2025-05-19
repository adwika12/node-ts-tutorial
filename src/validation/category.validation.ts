import Joi from 'joi';

export const categoryValidation = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  description: Joi.string().optional().allow('').messages({
    'string.base': 'Description must be a string',
  }),
});
