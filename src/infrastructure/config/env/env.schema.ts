import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  API_PORT: Joi.number().required(),
  API_NAME: Joi.string().required(),
  API_VERSION: Joi.string()
    .optional()
    .default('v0.1')
    .regex(/v\d\.\d+\.\d+/),
  API_DESCRIPTION: Joi.string().optional().default(''),
  SECRET_TOKEN: Joi.string().required(),
});
