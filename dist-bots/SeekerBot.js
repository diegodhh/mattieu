"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Seeker = /*#__PURE__*/function () {
  function Seeker(client) {
    var _this = this;

    _classCallCheck(this, Seeker);

    _defineProperty(this, "run", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var recommendations;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(new Date() + ' seekerbot');
              _context.prev = 1;
              _context.next = 4;
              return _this.getRecommendations();

            case 4:
              recommendations = _context.sent;

              if (recommendations && recommendations.results && recommendations.results.length) {
                _this._likeEveryBody(recommendations);
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);

            case 11:
              _this.setNext(_this.run, _this.nextTry);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    })));

    _defineProperty(this, "getRecommendations", function () {
      return _this.client.getRecommendations();
    });

    _defineProperty(this, "_likeEveryBody", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(lastRecommendations) {
        var exitFlag;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                exitFlag = false;
                lastRecommendations.results.forEach(function (item, index) {
                  var randomNumber = randomInt(2000, 4000);
                  var waitTime = randomNumber * index;
                  setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var randomNumber2, like, recommendations;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            randomNumber2 = randomInt(1, 10);

                            if (exitFlag) {
                              _context2.next = 13;
                              break;
                            }

                            if (!(randomNumber2 > 3 && item.gender === 1 || randomNumber2 > 9 && item.gender === 0)) {
                              _context2.next = 8;
                              break;
                            }

                            console.log('pass');
                            _context2.next = 6;
                            return _this.client.pass(item._id);

                          case 6:
                            _context2.next = 13;
                            break;

                          case 8:
                            _context2.next = 10;
                            return _this.client.like(item._id);

                          case 10:
                            like = _context2.sent;
                            console.log('like');

                            if (!like.likes_remaining) {
                              exitFlag = true;
                              console.log("NO MORE LIKES");
                            }

                          case 13:
                            if (!(lastRecommendations.results.length - 1 === index && !exitFlag)) {
                              _context2.next = 18;
                              break;
                            }

                            _context2.next = 16;
                            return _this.getRecommendations();

                          case 16:
                            recommendations = _context2.sent;

                            if (!exitFlag && recommendations && recommendations.results && recommendations.results.length) {
                              _this._likeEveryBody(recommendations);
                            }

                          case 18:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  })), waitTime);
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    this.client = client;
    this.nextTry = 60 * 1000 * 60 * 1;
  }

  _createClass(Seeker, [{
    key: "setNext",
    value: function setNext(cb, time) {
      setTimeout(function () {
        cb();
      }, time);
    }
  }]);

  return Seeker;
}();

var _default = Seeker;
exports["default"] = _default;

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function likeRecomendations() {
  return _likeRecomendations.apply(this, arguments);
}

function _likeRecomendations() {
  _likeRecomendations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
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
  return _likeRecomendations.apply(this, arguments);
}