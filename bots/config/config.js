// require and configure dotenv, will load vars in .env in PROCESS.ENV
import dotenv from 'dotenv';
dotenv.config();


const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  facebookUser: {
    email: process.env.FACEBOOK_EMAIL,
    number: process.env.FACEBOOK_NUMBER,
    password: process.env.FACEBOOK_PASSWORD,
  },
  ubication: {
    latitude: process.env.UBICATION_LATITUD, longitude:process.env.UBICATION_LONGITUDE
  }
};

export default config;
