'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

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
            if ((typeof id === 'undefined' ? 'undefined' : (0, _typeof3.default)(id)) !== 'symbol') {
                id = this.constructor.getId(id);
            }
            return this.__cache[id];
        }
    }, {
        key: 'append',
        value: function append(key, value) {
            this.__cache[this.constructor.getId(key)] = value;
            return this;
        }
    }, {
        key: 'clean',
        value: function clean() {
            this.__cache = {};
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

var globCache = new Cache();

var createDynamic = function createDynamic(currentCache, ajax) {
    return function (WrappedComponent) {
        var _class, _temp;

        var ajaxWithCache = function ajaxWithCache(props) {
            var cache = currentCache.getCache(props);
            if (cache) {
                return cache;
            } else {
                var promise = ajax(props);
                currentCache.append(props, promise);
                return promise;
            }
        };
        return _temp = _class = function (_PureComponent) {
            (0, _inherits3.default)(Dynamic, _PureComponent);

            function Dynamic(props) {
                (0, _classCallCheck3.default)(this, Dynamic);

                var _this = (0, _possibleConstructorReturn3.default)(this, (Dynamic.__proto__ || (0, _getPrototypeOf2.default)(Dynamic)).call(this, props));

                _this.state = {
                    results: null,
                    isError: false,
                    isLoading: true
                };

                _this.changeResults = function (results) {
                    _this.setState({ results: results });
                };

                _this.getData = function () {
                    var _this$props = _this.props,
                        url = _this$props.url,
                        params = _this$props.params,
                        data = _this$props.data,
                        onError = _this$props.onError,
                        onStart = _this$props.onStart,
                        onSuccess = _this$props.onSuccess,
                        onComplete = _this$props.onComplete,
                        options = _this$props.options,
                        cache = _this$props.cache;

                    _this.setState({ isError: false, isLoading: true }, function () {
                        return onStart && onStart();
                    });
                    _this.cancelHandler();
                    var cancelToken = new _axios2.default.CancelToken(function (cancelHandler) {
                        _this.cancelHandler = cancelHandler;
                    });
                    (cache ? ajaxWithCache : ajax)((0, _extends3.default)({
                        url: url, params: params, data: data, cancelToken: cancelToken }, options)).then(function (_ref2) {
                        var data = _ref2.data;
                        var getResults = _this.props.getResults;

                        var _getResults = getResults(data),
                            err_no = _getResults.err_no,
                            results = _getResults.results;

                        if (err_no == '0') {
                            _this.setState({
                                isLoading: false, results: results
                            });
                            onSuccess && onSuccess(data);
                        } else {
                            return _promise2.default.reject(new Error(data));
                        }
                    }).catch(function (e) {
                        if (!_axios2.default.isCancel(e)) {
                            onError && onError(e);
                            _this.setState({ isError: true });
                        }
                    }).then(function () {
                        onComplete && onComplete();
                    });
                };

                _this.cancelHandler = function () {};
                return _this;
            }

            (0, _createClass3.default)(Dynamic, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.getData();
                }
            }, {
                key: 'componentDidUpdate',
                value: function componentDidUpdate(_ref3) {
                    var params = _ref3.params,
                        data = _ref3.data;

                    if (!((0, _isEqual2.default)(params, this.props.params) && (0, _isEqual2.default)(data, this.props.data))) {
                        this.getData();
                    }
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.cancelHandler();
                }
            }, {
                key: 'render',
                value: function render() {
                    var _props = this.props,
                        loading = _props.loading,
                        error = _props.error,
                        args = (0, _objectWithoutProperties3.default)(_props, ['loading', 'error']);

                    if (this.state.isError) {
                        return error;
                    }
                    if (this.state.isLoading) {
                        return loading;
                    } else {
                        return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, args, { results: this.state.results, changeResults: this.changeResults,
                            getData: this.getData }));
                    }
                }
            }]);
            return Dynamic;
        }(_react.PureComponent), _class.defaultProps = {
            loading: null,
            error: null,
            cache: false,
            getResults: function getResults(data) {
                if (data.hasOwnProperty('err_no') && data.hasOwnProperty('results')) {
                    return { err_no: data.err_no, results: data.results };
                }
                return data;
            }
        }, _temp;
    };
};

exports.default = function (ajax) {
    var dynamic = createDynamic(globCache, ajax);
    dynamic.createCacheDynamic = function () {
        var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Cache();
        return createDynamic(cache);
    };
    dynamic.Cache = Cache;
    dynamic.cleanCache = function () {
        globCache.clean();
    };
    return dynamic;
};