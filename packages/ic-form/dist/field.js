'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _RULES = require('./util/RULES');

var _RULES2 = _interopRequireDefault(_RULES);

var _validate2 = require('./util/validate');

var _validate3 = _interopRequireDefault(_validate2);

var _compileErrMsg = require('./util/compileErrMsg');

var _compileErrMsg2 = _interopRequireDefault(_compileErrMsg);

var _OrderPromise = require('./util/OrderPromise');

var _OrderPromise2 = _interopRequireDefault(_OrderPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (WrappedComponent) {
    var Field = function (_PureComponent) {
        (0, _inherits3.default)(Field, _PureComponent);

        function Field() {
            var _ref,
                _this2 = this;

            var _temp, _this, _ret;

            (0, _classCallCheck3.default)(this, Field);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Field.__proto__ || (0, _getPrototypeOf2.default)(Field)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
                errorState: 0,
                errorMsg: ''
            }, _this.orderPromise = new _OrderPromise2.default(), _this.validateChange = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _this$props, name, api, label, value, newValue, res;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _this$props = _this.props, name = _this$props.name, api = _this$props.api, label = _this$props.label, value = api.data[name];

                                if (typeof value === 'string') {
                                    newValue = value.trim();

                                    if (newValue !== value) {
                                        api.onDataChange(name, newValue);
                                    }
                                }

                                _this.setState({
                                    errorState: 3, errorMsg: ''
                                });

                                _context.next = 5;
                                return _this.validate(value);

                            case 5:
                                res = _context.sent;


                                _this.orderPromise.clean();

                                _context.next = 9;
                                return new _promise2.default(function (resolve) {
                                    if (res.result) {
                                        _this.setState({
                                            errorState: 1, errorMsg: ''
                                        }, function () {
                                            return resolve();
                                        });
                                    } else {
                                        _this.setState({
                                            errorState: 2, errorMsg: (0, _compileErrMsg2.default)(res.errMsg, label)
                                        }, function () {
                                            return resolve();
                                        });
                                    }
                                });

                            case 9:

                                api.onValidateChange(name, {
                                    result: res.result, errorMsg: _this.state.errorMsg
                                });
                                return _context.abrupt('return', res);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            })), _this.handlerBlur = function (e) {
                var onBlur = _this.props.onBlur;

                onBlur && onBlur(e);
                _this.validateChange();
            }, _this.handlerChange = function (value) {
                var _this$props2 = _this.props,
                    name = _this$props2.name,
                    onChange = _this$props2.onChange,
                    api = _this$props2.api;

                onChange && onChange(value);
                api.onDataChange(name, value);
            }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
        }

        (0, _createClass3.default)(Field, [{
            key: 'validate',
            value: function validate(value) {
                var _props = this.props,
                    rule = _props.rule,
                    api = _props.api,
                    errMsg = _props.errMsg;

                var rules = (0, _assign2.default)({}, _RULES2.default, api.rules);
                if (!this.validatePromise || this.prevValue !== value) {
                    this.validatePromise = (0, _validate3.default)(value, {
                        rule: rule, rules: rules, errMsg: errMsg
                    }).then(function (res) {
                        return res;
                    });
                }
                this.prevValue = value;

                return this.orderPromise.add(this.validatePromise);
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _props2 = this.props,
                    name = _props2.name,
                    api = _props2.api;

                api.onFieldInstall(name, this);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                var _props3 = this.props,
                    name = _props3.name,
                    api = _props3.api;

                api.onFieldUninstall(name);
            }
        }, {
            key: 'render',
            value: function render() {
                var _props4 = this.props,
                    name = _props4.name,
                    rule = _props4.rule,
                    errMsg = _props4.errMsg,
                    api = _props4.api,
                    props = (0, _objectWithoutProperties3.default)(_props4, ['name', 'rule', 'errMsg', 'api']);

                return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, props, { value: api.data[name],
                    errorState: this.state.errorState,
                    errorMsg: this.state.errorMsg,
                    onChange: this.handlerChange,
                    onBlur: this.handlerBlur }));
            }
        }]);
        return Field;
    }(_react.PureComponent);

    return function (props) {
        return _react2.default.createElement(
            _Context2.default.Consumer,
            null,
            function (fieldProps) {
                return _react2.default.createElement(Field, (0, _extends3.default)({}, props, { api: fieldProps }));
            }
        );
    };
};