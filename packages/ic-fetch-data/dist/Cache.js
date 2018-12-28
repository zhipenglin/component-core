'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.globCache = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _for = require('babel-runtime/core-js/symbol/for');

var _for2 = _interopRequireDefault(_for);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cache = function () {
    (0, _createClass3.default)(Cache, null, [{
        key: 'getId',
        value: function getId(_ref) {
            var url = _ref.url,
                params = _ref.params,
                data = _ref.data,
                method = _ref.method,
                baseURL = _ref.baseURL,
                headers = _ref.headers;

            return (0, _for2.default)((0, _objectHash2.default)({ url: url, params: params, data: data, method: method, baseURL: baseURL, headers: headers }));
        }
    }]);

    function Cache() {
        (0, _classCallCheck3.default)(this, Cache);

        this.__cache = {};
    }

    (0, _createClass3.default)(Cache, [{
        key: 'getCache',
        value: function getCache(id) {
            var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';

            if ((typeof id === 'undefined' ? 'undefined' : (0, _typeof3.default)(id)) !== 'symbol') {
                id = this.constructor.getId(id);
            }
            return (0, _get2.default)(this.__cache, '[' + namespace + ']', {})[id];
        }
    }, {
        key: 'append',
        value: function append(key, value) {
            var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'global';

            this.__cache[namespace] = (0, _assign2.default)({}, this.__cache[namespace], (0, _defineProperty3.default)({}, this.constructor.getId(key), value));
            return this;
        }
    }, {
        key: 'clean',
        value: function clean() {
            var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'global';

            this.__cache[namespace] = {};
            return this;
        }
    }, {
        key: 'allCache',
        get: function get() {
            return (0, _assign2.default)({}, this.__cache);
        }
    }]);
    return Cache;
}();

exports.default = Cache;
var globCache = exports.globCache = new Cache();