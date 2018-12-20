'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _Cache = require('./Cache');

var _Cache2 = _interopRequireDefault(_Cache);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _createGetData = require('./createGetData');

var _createGetData2 = _interopRequireDefault(_createGetData);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createListLoader = function createListLoader(currentCache, ajax) {
    return function (WrappedComponent) {
        var _class, _temp;

        var getAjaxData = (0, _createGetData2.default)(currentCache, ajax);
        return _temp = _class = function (_PureComponent) {
            (0, _inherits3.default)(ListLoader, _PureComponent);

            function ListLoader(props) {
                (0, _classCallCheck3.default)(this, ListLoader);

                var _this = (0, _possibleConstructorReturn3.default)(this, (ListLoader.__proto__ || (0, _getPrototypeOf2.default)(ListLoader)).call(this, props));

                _this.getData = function (refresh) {
                    return _promise2.default.resolve().then(function () {
                        if (refresh === true) {
                            return new _promise2.default(function (reslove) {
                                _this.setState({
                                    list: [],
                                    results: null,
                                    currentPage: _this.props.startIndex,
                                    isLoading: false,
                                    isComplete: false
                                }, reslove);
                            });
                        }
                    }).then(function () {
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
                            getResults = _this$props.getResults,
                            pageSizeKey = _this$props.pageSizeKey,
                            pageKey = _this$props.pageKey;

                        var mixinProps = function mixinProps(target) {
                            var _Object$assign2;

                            return (0, _assign2.default)({}, target, (_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, pageSizeKey, _this.pageSize), (0, _defineProperty3.default)(_Object$assign2, pageKey, _this.state.currentPage), _Object$assign2));
                        };
                        if (_this.state.isLoading) {
                            return;
                        }
                        if (_this.state.isComplete) {
                            return;
                        }

                        return new _promise2.default(function (resolve) {
                            _this.setState({
                                isLoading: true
                            }, resolve);
                        }).then(function () {
                            return getAjaxData({
                                url: url, params: mixinProps(params), data: mixinProps(data),
                                onError: function onError(e) {
                                    _onError && _onError(e);
                                    _this.setState({ isLoading: false });
                                },
                                onStart: function onStart() {
                                    _this.setState({ isLoading: true }, function () {
                                        return _onStart && _onStart();
                                    });
                                },
                                onSuccess: function onSuccess(data) {
                                    var _getResults = getResults(data),
                                        list = _getResults.list,
                                        results = _getResults.results,
                                        countAll = _getResults.countAll,
                                        newList = [].concat((0, _toConsumableArray3.default)(_this.state.list), (0, _toConsumableArray3.default)(list || []));

                                    _this.setState({
                                        isLoading: false,
                                        currentPage: _this.state.currentPage + 1,
                                        results: results,
                                        list: newList,
                                        isComplete: countAll && countAll <= newList.length
                                    });
                                    _onSuccess && _onSuccess(data);
                                }, onComplete: onComplete, options: options, cache: cache, getResults: getResults
                            });
                        });
                    });
                };

                _this.pageSize = _this.props.pageSize;
                _this.state = {
                    list: _this.props.defaultList,
                    results: null,
                    currentPage: _this.props.startIndex,
                    isLoading: false,
                    isComplete: false
                };
                return _this;
            }

            (0, _createClass3.default)(ListLoader, [{
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
                        this.getData(true);
                    }
                }
            }, {
                key: 'render',
                value: function render() {
                    var _props = this.props,
                        loading = _props.loading,
                        complete = _props.complete;

                    return _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, (0, _omit2.default)(this.props, ['loading', 'complete', 'cache', 'pageKey', 'pageSizeKey', 'startIndex', 'defaultList', 'pageSize', 'getResults', 'url', 'params', 'data', 'onError', 'onStart', 'onSuccess', 'onComplete', 'options']), {
                            list: this.state.list, results: this.state.results, load: this.getData })),
                        this.state.isLoading ? loading : null,
                        this.state.list.length > 0 && this.state.isComplete ? complete : null
                    );
                }
            }]);
            return ListLoader;
        }(_react.PureComponent), _class.defaultProps = {
            loading: null,
            complete: null,
            cache: false,
            pageKey: 'page',
            pageSizeKey: 'pageSize',
            startIndex: 1,
            defaultList: [],
            pageSize: 10,
            getResults: function getResults(data) {
                if (data.hasOwnProperty('err_no') && data.hasOwnProperty('results')) {
                    return {
                        err_no: data.err_no,
                        results: (0, _get2.default)(data, 'results'),
                        list: (0, _get2.default)(data, 'results.list'),
                        countAll: (0, _get2.default)(data, 'results.count_all')
                    };
                }
                return data;
            }
        }, _temp;
    };
};

exports.default = function (ajax) {
    var listLoader = createListLoader(_Cache.globCache, ajax);
    listLoader.createCacheDynamic = function () {
        var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Cache2.default();
        return createListLoader(cache);
    };
    listLoader.Cache = _Cache2.default;
    listLoader.cleanCache = function () {
        _Cache.globCache.clean();
    };
    return listLoader;
};