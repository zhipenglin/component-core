'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

var _cleanObject = require('./util/cleanObject');

var _cleanObject2 = _interopRequireDefault(_cleanObject);

var _getFieldInfo = require('./util/getFieldInfo');

var _getFieldInfo2 = _interopRequireDefault(_getFieldInfo);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _icCache = require('ic-cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = function (_PureComponent) {
    (0, _inherits3.default)(Form, _PureComponent);

    function Form(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, Form);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this, props));

        _this.state = {
            isPass: false,
            data: {}
        };

        _this.handlerDataChange = function (name, value) {
            var _this$props = _this.props,
                cache = _this$props.cache,
                onDataChange = _this$props.onDataChange;

            _this.setState({
                data: (0, _cleanObject2.default)((0, _assign2.default)({}, _this.state.data, (0, _defineProperty3.default)({}, name, value)))
            }, function () {
                cache && (0, _icCache.setCache)('form-cache-' + cache, _this.state.data);
                onDataChange && onDataChange(_this.state.data);
            });
        };

        _this.handlerValidateChange = function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name, res) {
                var onValidate;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                onValidate = _this.props.onValidate;

                                _this.fieldList[name].info = res;
                                _context.t0 = onValidate;

                                if (!_context.t0) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.t1 = onValidate;
                                _context.next = 7;
                                return _this.isPass();

                            case 7:
                                _context.t2 = _context.sent;
                                _context.t3 = res;
                                _context.t4 = _this.state.data;
                                (0, _context.t1)(_context.t2, _context.t3, _context.t4);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.handlerFieldInstall = function (name, field) {
            _this.fieldList[name] = { field: field, info: {} };
        };

        _this.handlerFieldUninstall = function (name) {
            delete _this.fieldList[name];
            _this.handlerDataChange(name, undefined);
        };

        _this.setData = function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _this.setState({ data: data }, function () {
                return _this.isPass();
            });
        };

        _this.getData = function () {
            return _this.state.data;
        };

        _this.submit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var _this$props2, onSubmit, onPrevSubmit, onError, cache, isPass, validateInfo;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _this$props2 = _this.props;
                            onSubmit = _this$props2.onSubmit;
                            onPrevSubmit = _this$props2.onPrevSubmit;
                            onError = _this$props2.onError;
                            cache = _this$props2.cache;
                            _context2.next = 7;
                            return _this.isPass(true);

                        case 7:
                            isPass = _context2.sent;
                            validateInfo = (0, _getFieldInfo2.default)(_this.fieldList);

                            onPrevSubmit && onPrevSubmit(isPass, validateInfo, _this.state.data);

                            if (isPass) {
                                _context2.next = 13;
                                break;
                            }

                            onError && onError(validateInfo);
                            return _context2.abrupt('return');

                        case 13:
                            onSubmit(_this.state.data);
                            cache && (0, _icCache.removeCache)('form-cache-' + cache);

                        case 15:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        _this.fieldList = {};
        return _this;
    }

    (0, _createClass3.default)(Form, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                cache = _props.cache,
                data = _props.data;

            var localData = (0, _icCache.getCache)('form-cache-' + cache);
            var newData = (0, _merge2.default)({}, data);
            if (cache) {
                (0, _merge2.default)(newData, localData);
            }

            if ((0, _keys2.default)(newData).length > 0) {
                this.setData(newData);
            }
        }
    }, {
        key: 'isPass',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var _this3 = this;

                var isForce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var isPass;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                isPass = true;
                                _context4.next = 3;
                                return _promise2.default.all((0, _keys2.default)(this.fieldList).map(function () {
                                    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(name) {
                                        var _fieldList$name, field, info;

                                        return _regenerator2.default.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _fieldList$name = _this3.fieldList[name], field = _fieldList$name.field, info = _fieldList$name.info;

                                                        if (!(isForce || info.result === undefined)) {
                                                            _context3.next = 9;
                                                            break;
                                                        }

                                                        _context3.next = 4;
                                                        return field.validateChange(_this3.state.data[name]);

                                                    case 4:
                                                        _context3.t0 = _context3.sent.result;

                                                        if (!(_context3.t0 === false)) {
                                                            _context3.next = 7;
                                                            break;
                                                        }

                                                        isPass = false;

                                                    case 7:
                                                        _context3.next = 10;
                                                        break;

                                                    case 9:
                                                        if (info.result === false) {
                                                            isPass = false;
                                                        }

                                                    case 10:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this3);
                                    }));

                                    return function (_x5) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }()));

                            case 3:
                                this.setState({ isPass: isPass });
                                return _context4.abrupt('return', isPass);

                            case 5:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function isPass() {
                return _ref3.apply(this, arguments);
            }

            return isPass;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                rules = _props2.rules,
                children = _props2.children;

            return _react2.default.createElement(
                _Context2.default.Provider,
                { value: {
                        data: this.state.data,
                        rules: rules,
                        isPass: this.state.isPass,
                        submit: this.submit,
                        onFieldInstall: this.handlerFieldInstall,
                        onFieldUninstall: this.handlerFieldUninstall,
                        onDataChange: this.handlerDataChange,
                        onValidateChange: this.handlerValidateChange
                    } },
                children
            );
        }
    }]);
    return Form;
}(_react.PureComponent);

var FormApi = function (_PureComponent2) {
    (0, _inherits3.default)(FormApi, _PureComponent2);

    function FormApi() {
        var _ref5,
            _this5 = this;

        var _temp, _this4, _ret;

        (0, _classCallCheck3.default)(this, FormApi);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this4 = (0, _possibleConstructorReturn3.default)(this, (_ref5 = FormApi.__proto__ || (0, _getPrototypeOf2.default)(FormApi)).call.apply(_ref5, [this].concat(args))), _this4), _this4.submit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _this4.form.submit();

                        case 2:
                            return _context5.abrupt('return', _this4);

                        case 3:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        })), _this4.setError = function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(name, _ref8) {
                var _ref8$result = _ref8.result,
                    result = _ref8$result === undefined ? true : _ref8$result,
                    _ref8$errMsg = _ref8.errMsg,
                    errMsg = _ref8$errMsg === undefined ? '' : _ref8$errMsg;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return _this4.form.handlerValidateChange(name, { result: result, errMsg: errMsg });

                            case 2:
                                return _context6.abrupt('return', _this4);

                            case 3:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this5);
            }));

            return function (_x6, _x7) {
                return _ref7.apply(this, arguments);
            };
        }(), _temp), (0, _possibleConstructorReturn3.default)(_this4, _ret);
    }

    (0, _createClass3.default)(FormApi, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(Form, (0, _extends3.default)({}, this.props, { ref: this.form }));
        }
    }, {
        key: 'data',
        set: function set(value) {
            this.form.setData(value);
        },
        get: function get() {
            return this.form.getData();
        }
    }]);
    return FormApi;
}(_react.PureComponent);

exports.default = FormApi;