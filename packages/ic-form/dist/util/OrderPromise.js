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

var OrderPromise = function () {
    function OrderPromise() {
        (0, _classCallCheck3.default)(this, OrderPromise);

        this.promiseList = [];
    }

    (0, _createClass3.default)(OrderPromise, [{
        key: "add",
        value: function add(promise) {
            var _this = this;

            this.promiseList.push(promise);

            var isNewPromise = function isNewPromise(res) {
                var lastPromise = _this.promiseList[_this.promiseList.length - 1];
                if (lastPromise === promise) {
                    return res;
                } else {
                    return lastPromise;
                }
            };

            return promise.then(function (res) {
                return isNewPromise(res);
            }, function (err) {
                return isNewPromise(_promise2.default.reject(err));
            });
        }
    }, {
        key: "clean",
        value: function clean() {
            this.promiseList = [];
        }
    }]);
    return OrderPromise;
}();

exports.default = OrderPromise;