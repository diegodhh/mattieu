// require and configure dotenv, will load vars in .env in PROCESS.ENV
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env)

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  facebookUser: {
    email: process.env.FACEBOOK_EMAIL,
    number: process.env.FACEBOOK_NUMBER,
    password: process.env.FACEBOOK_PASSWORD,
  }
};

export default config;
