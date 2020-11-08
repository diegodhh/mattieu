"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// require and configure dotenv, will load vars in .env in PROCESS.ENV
_dotenv["default"].config();

var config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  facebookUser: {
    email: process.env.FACEBOOK_EMAIL,
    number: process.env.FACEBOOK_NUMBER,
    password: process.env.FACEBOOK_PASSWORD
  },
  ubication: {
    latitude: process.env.UBICATION_LATITUD,
    longitude: process.env.UBICATION_LONGITUDE
  }
};
var _default = config;
exports["default"] = _default;