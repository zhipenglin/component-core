"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = function () {
    function Filter() {
        (0, _classCallCheck3.default)(this, Filter);
    }

    (0, _createClass3.default)(Filter, [{
        key: "request",
        value: function request(config) {
            return _promise2.default.resolve(config);
        }
    }, {
        key: "response",
        value: function response(_response) {
            return _promise2.default.resolve(_response);
        }
    }], [{
        key: "getInstance",
        value: function getInstance() {
            if (false === this.instance instanceof this) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                this.instance = new (Function.prototype.bind.apply(this, [null].concat(args)))();
            }
            return this.instance;
        }
    }, {
        key: "filterIterator",
        value: function filterIterator(filter, callback, isReverse) {
            var promise = _promise2.default.resolve(),
                list = [];
            if (filter) {
                if (filter.prototype instanceof Filter) {
                    list.push(filter);
                } else if (Array.isArray(filter)) {
                    filter.forEach(function (item) {
                        if (item.prototype instanceof Filter) {
                            list.push(item);
                        }
                    });
                }
                if (isReverse) {
                    list = list.reverse();
                }
                list.forEach(function (item) {
                    promise = promise.then(function () {
                        return callback(item.getInstance());
                    });
                });
            }
            return promise;
        }
    }]);
    return Filter;
}();

exports.default = Filter;