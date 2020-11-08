"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// require and configure dotenv, will load vars in .env in PROCESS.ENV
_dotenv["default"].config();

console.log(process.env);
var config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  facebookUser: {
    email: process.env.FACEBOOK_EMAIL,
    number: process.env.FACEBOOK_NUMBER,
    password: process.env.FACEBOOK_PASSWORD
  }
};
var _default = config;
exports["default"] = _default;