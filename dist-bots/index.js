"use strict";

var _config = _interopRequireDefault(require("./config/config"));

var _SeekerBot = _interopRequireDefault(require("./SeekerBot"));

var _LoverBot = _interopRequireDefault(require("./LoverBot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('tinder-client'),
    createClientFromFacebookLogin = _require.createClientFromFacebookLogin;

var relaseLoverInterval = 1000 * 60 * 3;
var sleep = false;
var sleepInterval = 60 * 1000 * 60 * 1 * 5;
var profileLog;
var LastMessage = 'none';

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var client, seeker, profile;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            setInterval(function () {
              relaseLoverInterval = 1000 * 60 * 15;
              console.log('longTime', relaseLoverInterval);
            }, 60 * 1000 * 10);
            setInterval(function () {
              sleep = !sleep;
              console.log('sleep:', sleep);
            }, sleepInterval);
            _context.next = 5;
            return createClientFromFacebookLogin({
              emailAddress: _config["default"].facebookUser.email,
              password: _config["default"].facebookUser.password
            });

          case 5:
            client = _context.sent;

            if (!_config["default"].ubication.latitude) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return client.changeLocation({
              latitude: _config["default"].ubication.latitude,
              longitude: _config["default"].ubication.longitude
            });

          case 9:
            seeker = new _SeekerBot["default"](client, {
              tinderGold: _config["default"].tinderGold
            });
            seeker.run();
            _context.next = 13;
            return client.getProfile();

          case 13:
            profile = _context.sent;
            profileLog = profile;
            console.log(profile);
            releaseLovers(client, profile);
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            setTimeout(function () {
              init();
            }, 60 * 1000 * 120);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));
  return _init.apply(this, arguments);
}

init();

var express = require('express');

var app = express();
var port = _config["default"].port || 3000;
app.get('/', function (req, res) {
  if (profileLog) {
    res.send("".concat(LastMessage, " ").concat(profileLog.name, " ").concat(profileLog.pos_info.timezone));
  } else {
    res.send('no profile');
  }
});
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function releaseLovers(_x, _x2) {
  return _releaseLovers.apply(this, arguments);
}

function _releaseLovers() {
  _releaseLovers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(client, profile) {
    var updates;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (sleep) {
              _context3.next = 7;
              break;
            }

            console.log('sleep' + sleep);
            _context3.next = 5;
            return client.getUpdates();

          case 5:
            updates = _context3.sent;

            if (updates.matches && updates.matches.length) {
              console.log('releaseLovers', new Date());
              console.log(relaseLoverInterval);
              updates.matches.map( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(match, index) {
                  var lover;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          lover = new _LoverBot["default"](client, match, profile);

                          if (lover.run()) {
                            relaseLoverInterval = 1000 * 60 * 1.5;
                            LastMessage = new Date();
                          }

                          return _context2.abrupt("return", lover);

                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3, _x4) {
                  return _ref.apply(this, arguments);
                };
              }());
            }

          case 7:
            if (relaseLoverInterval) {
              setTimeout(function () {
                releaseLovers(client, profile);
              }, relaseLoverInterval);
            }

            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            setTimeout(function () {
              releaseLovers(client, profile);
            }, relaseLoverInterval);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _releaseLovers.apply(this, arguments);
}