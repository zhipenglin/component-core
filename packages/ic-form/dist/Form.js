'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = function (_Component) {
    (0, _inherits3.default)(Form, _Component);

    function Form(props) {
        (0, _classCallCheck3.default)(this, Form);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this, props));

        _initialiseProps.call(_this);

        _this.fieldList = {};
        _this.eventList = {
            submit: [],
            prevSubmit: [],
            error: [],
            validate: [],
            dataChange: []
        };
        _this.state = {
            isPass: false,
            data: {}
        };
        var cache = props.cache,
            data = props.data,
            localData = (0, _icCache.getCache)('form-cache-' + cache),
            newData = (0, _merge2.default)({}, data);

        if (cache) {
            (0, _merge2.default)(newData, localData);
        }
        if ((0, _keys2.default)(newData).length > 0) {
            _this.state.data = newData;
        }
        return _this;
    }

    (0, _createClass3.default)(Form, [{
        key: 'isPass',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var _this2 = this;

                var isForce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var isPass;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                isPass = true;
                                _context2.next = 3;
                                return _promise2.default.all((0, _keys2.default)(this.fieldList).map(function () {
                                    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name) {
                                        var _fieldList$name, field, info, res;

                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _fieldList$name = _this2.fieldList[name], field = _fieldList$name.field, info = _fieldList$name.info;

                                                        if (!isForce) {
                                                            _context.next = 8;
                                                            break;
                                                        }

                                                        _context.next = 4;
                                                        return field.runValidate(_this2.state.data[name]);

                                                    case 4:
                                                        res = _this2.fieldList[name].info = _context.sent;

                                                        if (res.result === false) {
                                                            isPass = false;
                                                        }
                                                        _context.next = 9;
                                                        break;

                                                    case 8:
                                                        if (info.result === false || info.result === undefined) {
                                                            isPass = false;
                                                        }

                                                    case 9:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this2);
                                    }));

                                    return function (_x2) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }()));

                            case 3:
                                this.setState({ isPass: isPass });
                                return _context2.abrupt('return', isPass);

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function isPass() {
                return _ref.apply(this, arguments);
            }

            return isPass;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                rules = _props.rules,
                children = _props.children;

            return _react2.default.createElement(
                _Context2.default.Provider,
                { value: {
                        data: this.state.data,
                        rules: rules,
                        isPass: this.state.isPass,
                        submit: this.submit,
                        addEventListener: this.addEventListener,
                        removeEventListener: this.removeEventListener,
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
}(_react.Component);

Form.propTypes = {
    onSubmit: _propTypes2.default.func.isRequired,
    onPrevSubmit: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    cache: _propTypes2.default.string,
    data: _propTypes2.default.object,
    rules: _propTypes2.default.object
};

var _initialiseProps = function _initialiseProps() {
    var _this5 = this;

    this.handlerDataChange = function (name, value) {
        var _props2 = _this5.props,
            cache = _props2.cache,
            onDataChange = _props2.onDataChange;

        _this5.setState(function (_ref6) {
            var data = _ref6.data;

            var newData = (0, _cleanObject2.default)((0, _assign2.default)({}, data, (0, _defineProperty3.default)({}, name, value)));
            return { data: newData };
        }, function () {
            cache && (0, _icCache.setCache)('form-cache-' + cache, _this5.state.data);
            onDataChange && onDataChange(_this5.state.data);
            _this5.eventList.dataChange.forEach(function (callback) {
                return callback(_this5.state.data);
            });
        });
    };

    this.handlerValidateChange = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(name, res) {
            var onValidate, pass, validateInfo;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            onValidate = _this5.props.onValidate;

                            _this5.fieldList[name].info = res;
                            _context5.next = 4;
                            return _this5.isPass();

                        case 4:
                            pass = _context5.sent;
                            validateInfo = (0, _getFieldInfo2.default)(_this5.fieldList);

                            onValidate && onValidate(pass, validateInfo, _this5.state.data);
                            _this5.eventList.validate.forEach(function (callback) {
                                return callback(pass, validateInfo, _this5.state.data);
                            });

                        case 8:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }));

        return function (_x5, _x6) {
            return _ref7.apply(this, arguments);
        };
    }();

    this.handlerFieldInstall = function (name, field) {
        _this5.fieldList[name] = { field: field, info: {} };
        //为了保证表单初始化后，isPass是一个正确的值
        field.validate(_this5.state.data[name]).then(function (res) {
            if (res.result === true) {
                _this5.fieldList[name].info = { result: true };
            }
            return _this5.isPass();
        });
    };

    this.handlerFieldUninstall = function (name) {
        delete _this5.fieldList[name];

        _this5.setState(function (_ref8) {
            var data = _ref8.data;

            delete data[name];
            return { data: data };
        });
        _this5.handlerDataChange(name, undefined);
    };

    this.setData = function () {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _this5.setState({ data: data });
    };

    this.getData = function () {
        return _this5.state.data;
    };

    this.submit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var _props3, onSubmit, onPrevSubmit, onError, cache, isPass, validateInfo;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _props3 = _this5.props;
                        onSubmit = _props3.onSubmit;
                        onPrevSubmit = _props3.onPrevSubmit;
                        onError = _props3.onError;
                        cache = _props3.cache;
                        _context7.next = 7;
                        return _this5.isPass(true);

                    case 7:
                        isPass = _context7.sent;
                        validateInfo = (0, _getFieldInfo2.default)(_this5.fieldList);

                        onPrevSubmit && onPrevSubmit(isPass, validateInfo, _this5.state.data);
                        _this5.eventList.prevSubmit.forEach(function (callback) {
                            return callback(isPass, validateInfo, _this5.state.data);
                        });

                        if (isPass) {
                            _context7.next = 15;
                            break;
                        }

                        onError && onError(validateInfo);
                        _this5.eventList.error.forEach(function (callback) {
                            return callback(validateInfo, _this5.state.data);
                        });
                        return _context7.abrupt('return');

                    case 15:
                        _context7.next = 17;
                        return _promise2.default.all([_promise2.default.resolve(onSubmit(_this5.state.data))].concat((0, _toConsumableArray3.default)(_this5.eventList.submit.map(function () {
                            var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(callback) {
                                return _regenerator2.default.wrap(function _callee6$(_context6) {
                                    while (1) {
                                        switch (_context6.prev = _context6.next) {
                                            case 0:
                                                _context6.next = 2;
                                                return callback(_this5.state.data);

                                            case 2:
                                                return _context6.abrupt('return', _context6.sent);

                                            case 3:
                                            case 'end':
                                                return _context6.stop();
                                        }
                                    }
                                }, _callee6, _this5);
                            }));

                            return function (_x8) {
                                return _ref10.apply(this, arguments);
                            };
                        }()))));

                    case 17:
                        cache && (0, _icCache.removeCache)('form-cache-' + cache);

                    case 18:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, _this5);
    }));

    this.addEventListener = function (name, callback) {
        var eventList = _this5.eventList[name];
        Array.isArray(eventList) && eventList.push(callback);
    };

    this.removeEventListener = function (name, callback) {
        var eventList = _this5.eventList[name];
        if (Array.isArray(eventList)) {
            var index = eventList.indexOf(callback);
            index > -1 && eventList.splice(index, 1);
        }
    };
};

var FormApi = function (_PureComponent) {
    (0, _inherits3.default)(FormApi, _PureComponent);

    function FormApi(props) {
        var _this4 = this;

        (0, _classCallCheck3.default)(this, FormApi);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (FormApi.__proto__ || (0, _getPrototypeOf2.default)(FormApi)).call(this, props));

        _this3.setValue = function (name, value) {
            _this3.formRef.current.handlerDataChange(name, value);
        };

        _this3.forceValidate = function () {
            _this3.formRef.current.isPass(true);
        };

        _this3.submit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _this3.formRef.current.submit();

                        case 2:
                            return _context3.abrupt('return', _this3);

                        case 3:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this4);
        }));

        _this3.setError = function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(name, _ref5) {
                var _ref5$result = _ref5.result,
                    result = _ref5$result === undefined ? true : _ref5$result,
                    _ref5$errMsg = _ref5.errMsg,
                    errMsg = _ref5$errMsg === undefined ? '' : _ref5$errMsg;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _this3.formRef.current.handlerValidateChange(name, { result: result, errMsg: errMsg });

                            case 2:
                                return _context4.abrupt('return', _this3);

                            case 3:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this4);
            }));

            return function (_x3, _x4) {
                return _ref4.apply(this, arguments);
            };
        }();

        _this3.formRef = _react2.default.createRef();
        return _this3;
    }

    (0, _createClass3.default)(FormApi, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(Form, (0, _extends3.default)({}, this.props, { ref: this.formRef }));
        }
    }, {
        key: 'data',
        set: function set(value) {
            this.formRef.current.setData(value);
        },
        get: function get() {
            return this.formRef.current.getData();
        }
    }]);
    return FormApi;
}(_react.PureComponent);

exports.default = FormApi;