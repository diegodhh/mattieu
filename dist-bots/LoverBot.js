"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _conversationalTempates = _interopRequireDefault(require("./conversationalTempates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Lover = function Lover(client, match, profile) {
  var _this = this;

  _classCallCheck(this, Lover);

  _defineProperty(this, "run", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _ref2, messages, createdDate, currentStep, allSteps, nextStep, templates, randomIndex;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _ref2 = _this.match || {}, messages = _ref2.messages, createdDate = _ref2.created_date;
            currentStep = null;
            messages && messages.reverse().find(function (msg) {
              currentStep = Object.keys(_conversationalTempates["default"]).find(function (step) {
                // console.log(conversationalTemplates[step])
                // console.log(msg.message)
                var result = _conversationalTempates["default"][step].indexOf(msg.message) !== -1; // console.log(result)

                return result;
              }); //  console.log(currentStep)

              return currentStep;
            });
            allSteps = Object.keys(_conversationalTempates["default"]); // console.log('currentStep', currentStep)
            // console.log('index calcul',allSteps.indexOf(currentStep))

            nextStep = allSteps[allSteps.indexOf(currentStep) + 1]; // console.log('nextStep', nextStep)
            // console.log('ready', this._checkIfReady(messages, createdDate))

            if (!(!nextStep || !_this._checkIfReady(messages, createdDate))) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", false);

          case 8:
            // console.log('ready')
            templates = _conversationalTempates["default"][nextStep];

            if (templates) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", false);

          case 11:
            randomIndex = randomInt(0, templates.length);
            setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      try {
                        _this._sendMessage(templates[randomIndex] || templates[randomIndex - 1] || 'error 404 de roboto pelotudo');
                      } catch (err) {
                        console.log('sendmessage error', err);
                      }

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })), randomInt(0, 1000 * 120));
            return _context2.abrupt("return", true);

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  })));

  _defineProperty(this, "_checkIfReady", function (messages, createdDate) {
    if (messages && messages.length === 0) {
      return true;
    }

    var lastMessages = messages[0]; // console.log('lastMessage', lastMessages)
    // console.log('profileid', this.profile._id)

    if (_this.profile._id === lastMessages.to) {
      return true;
    }

    return false;
  });

  _defineProperty(this, "_sendMessage", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(msg) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("send message");
              _context3.prev = 1;
              _context3.next = 4;
              return _this.client.messageMatch({
                matchId: _this.match._id,
                message: msg
              });

            case 4:
              _this._waitForResponse();

              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 7]]);
    }));

    return function (_x) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getRecommendations", function () {
    return _this.client.getRecommendations();
  });

  _defineProperty(this, "_waitForResponse", function () {
    if (_this.checkResponseNumber > 0) {
      _this.checkResponseNumber = _this.checkResponseNumber - 1; // setTimeout(this._updateMatchAndRun, this.waitTime)
    }
  });

  _defineProperty(this, "_updateMatchAndRun", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(match) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x2) {
      return _ref5.apply(this, arguments);
    };
  }());

  this.client = client;
  this.match = match;
  this.profile = profile;
  this.waitTime = 1000 * 60;
  this.checkResponseNumber = 10;
};

var _default = Lover;
exports["default"] = _default;

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}