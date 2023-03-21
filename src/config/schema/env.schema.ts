import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'local')
    .default('development')
    .description('The application environment.'),
  PORT: Joi.number().default(3000).description('Port to listen on'),
  JWT_SECRET: Joi.string().required().description('JWT Secret'),
  JWT_EXPIRY: Joi.string().default('24h').description('JWT Expiry'),
  MONGO_URI: Joi.string().required().description('MongoDB URI'),
});
