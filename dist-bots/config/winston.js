"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logger = new _winston["default"].Logger({
  transports: [new _winston["default"].transports.Console({
    json: true,
    colorize: true
  })]
});
var _default = logger;
exports["default"] = _default;