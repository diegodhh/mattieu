"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cors = _interopRequireDefault(require("cors"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _expressWinston = _interopRequireDefault(require("express-winston"));

var _helmet = _interopRequireDefault(require("helmet"));

var _winston = _interopRequireDefault(require("./winston"));

var _index = _interopRequireDefault(require("../index.route"));

var _config = _interopRequireDefault(require("./config"));

var _is = _interopRequireDefault(require("../middleware/is-404"));

var _passport2 = _interopRequireDefault(require("./passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// all dependecies
// init express app
var app = (0, _express["default"])();

if (_config["default"].env === 'development') {
  app.use((0, _morgan["default"])('dev'));
} // parse body params and attache them to req.body


app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _compression["default"])());
app.use((0, _methodOverride["default"])()); // secure apps by setting various HTTP headers

app.use((0, _helmet["default"])()); // enable CORS - Cross Origin Resource Sharing

app.use((0, _cors["default"])()); // Passport middleware -> auth user -> JWT Strategy

app.use(_passport["default"].initialize()); // Passport Config

(0, _passport2["default"])(_passport["default"]); // enable detailed API logging in dev env

if (_config["default"].env === 'development') {
  _expressWinston["default"].requestWhitelist.push('body');

  _expressWinston["default"].responseWhitelist.push('body');

  app.use(_expressWinston["default"].logger({
    winstonInstance: _winston["default"],
    meta: true,
    // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).

  }));
} // mount all routes on /api path


app.use('/api', _index["default"]); // 404

app.use(_is["default"]); // log error in winston transports except when executing test suite

if (_config["default"].env !== 'test') {
  app.use(_expressWinston["default"].errorLogger({
    winstonInstance: _winston["default"]
  }));
} // error handler, send stacktrace only during development


app.use(function (err, req, res, next // eslint-disable-line no-unused-vars
) {
  return res.status(err.status).json({
    message: err.isPublic ? err.message : _httpStatus["default"][err.status],
    stack: _config["default"].env === 'development' ? err.stack : {}
  });
});
module.exports = app;