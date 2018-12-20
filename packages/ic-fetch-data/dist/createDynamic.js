'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Cache = require('./Cache');

var _Cache2 = _interopRequireDefault(_Cache);

var _createGetData = require('./createGetData');

var _createGetData2 = _interopRequireDefault(_createGetData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDynamic = function createDynamic(currentCache, ajax) {
    return function (WrappedComponent) {
        var _class, _temp;

        var getAjaxData = (0, _createGetData2.default)(currentCache, ajax);
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
                        _onError = _this$props.onError,
                        _onStart = _this$props.onStart,
                        _onSuccess = _this$props.onSuccess,
                        onComplete = _this$props.onComplete,
                        options = _this$props.options,
                        cache = _this$props.cache,
                        getResults = _this$props.getResults;

                    return getAjaxData({
                        url: url, params: params, data: data,
                        onError: function onError(e) {
                            _onError && _onError(e);
                            _this.setState({ isError: true });
                        },
                        onStart: function onStart() {
                            _this.setState({ isError: false, isLoading: true }, function () {
                                return _onStart && _onStart();
                            });
                        },
                        onSuccess: function onSuccess(data) {
                            _this.setState({
                                isLoading: false, results: getResults(data).results
                            });
                            _onSuccess && _onSuccess(data);
                        }, onComplete: onComplete, options: options, cache: cache, getResults: getResults
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
                value: function componentDidUpdate(_ref) {
                    var params = _ref.params,
                        data = _ref.data;

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
    var dynamic = createDynamic(_Cache.globCache, ajax);
    dynamic.createCacheDynamic = function () {
        var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Cache2.default();
        return createDynamic(cache);
    };
    dynamic.Cache = _Cache2.default;
    dynamic.cleanCache = function () {
        _Cache.globCache.clean();
    };
    return dynamic;
};