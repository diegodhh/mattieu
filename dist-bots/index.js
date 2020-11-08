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
            console.log(_config["default"]);
            _context.next = 5;
            return createClientFromFacebookLogin({
              emailAddress: _config["default"].facebookUser.email,
              password: _config["default"].facebookUser.password
            });

          case 5:
            client = _context.sent;
            seeker = new _SeekerBot["default"](client);
            seeker.run();
            _context.next = 10;
            return client.getProfile();

          case 10:
            profile = _context.sent;
            releaseLovers(client, profile);
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            setInterval(function () {
              init();
            }, 60 * 1000 * 10);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));
  return _init.apply(this, arguments);
}

init();

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
            _context3.next = 3;
            return client.getUpdates();

          case 3:
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

            if (relaseLoverInterval) {
              setTimeout(function () {
                releaseLovers(client, profile);
              }, relaseLoverInterval);
            }

            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            setTimeout(function () {
              releaseLovers(client, profile);
            }, relaseLoverInterval);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _releaseLovers.apply(this, arguments);
}