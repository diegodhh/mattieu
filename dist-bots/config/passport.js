"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passportJwt = require("passport-jwt");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_config["default"].jwtSecret);
var opts = {};
opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _config["default"].jwtSecret;

var _default = function _default(passport) {
  passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
    if (jwt_payload.id) return done(null, jwt_payload);
    return done(null, false);
  }));
}; //
//
//    JWT STRATEGY -- > https://jwt.io/
//
//


exports["default"] = _default;