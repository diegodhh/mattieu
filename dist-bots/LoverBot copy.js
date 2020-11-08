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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Lover = /*#__PURE__*/function () {
  function Lover(client, match, profile) {
    var _this = this;

    _classCallCheck(this, Lover);

    _defineProperty(this, "run", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _ref2, messages, createdDate, currentStep, defaultStep, templates, randomIndex, getedMatched;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(new Date() + 'loverbot');
              _context.prev = 1;
              _ref2 = _this.match || {}, messages = _ref2.messages, createdDate = _ref2.created_date;
              currentStep = null;
              currentStep = messages.slice().reverse().find(function (msg) {
                currentStep = Object.keys(_conversationalTempates["default"]).find(function (step) {
                  return _conversationalTempates["default"][step].indexOf(msg.messages) !== 1;
                });
                console.log(currentStep);
                return currentStep;
              });
              console.log(currentStep);
              defaultStep = Object.keys(_conversationalTempates["default"])[0];

              if (_this._checkIfReady(messages, createdDate)) {
                console.log('ready');
                templates = _conversationalTempates["default"][currentStep || defaultStep];
                randomIndex = randomInt(0, templates.length);

                _this._sendMessage(templates[randomIndex]);
              } else {
                console.log('notReady');
              }

              _context.next = 10;
              return _this.client.getMatch(_this.match._id);

            case 10:
              getedMatched = _context.sent;
              console.log(_this.match);
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 14]]);
    })));

    _defineProperty(this, "_checkIfReady", function (messages, createdDate) {
      console.log(new Date(createdDate));

      if (messages.length === 0) {
        return true;
      }

      var lastMessages = messages[messages.length - 1];

      if (_this.profile._id === lastMessages.to) {
        return true;
      }
    });

    _defineProperty(this, "_sendMessage", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(msg) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("send message");
                _context2.next = 3;
                return _this.client.messageMatch({
                  matchId: _this.match._id,
                  message: msg
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getRecommendations", function () {
      return _this.client.getRecommendations();
    });

    this.client = client;
    this.match = match;
    this.profile = profile;
    this.nextTry = 60 * 1000 * 60 * 5;
  }

  _createClass(Lover, [{
    key: "setNext",
    value: function setNext(cb, time) {
      setTimeout(function () {
        cb();
      }, time);
    }
  }]);

  return Lover;
}();

var _default = Lover;
exports["default"] = _default;

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function likeRecomendations() {
  return _likeRecomendations.apply(this, arguments);
}

function _likeRecomendations() {
  _likeRecomendations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _likeRecomendations.apply(this, arguments);
}