import React, {PureComponent} from 'react'
import withFormData from './withFormData'
import RULES from './util/RULES'
import validate from './util/validate'
import compileErrMsg from './util/compileErrMsg'
import OrderPromise from './util/OrderPromise'
import getFieldValue from './util/getFieldValue'
import compose from 'ic-compose'
import PropTypes from 'prop-types'

export default compose(withFormData,(WrappedComponent) => {
    return class Field extends PureComponent {
        static defaultProps={
            label:'',
            errMsg:''
        };
        static propTypes={
            name:PropTypes.string.isRequired,
            label:PropTypes.string,
            errMsg:PropTypes.string,
            rule:PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.func,
                PropTypes.instanceOf(RegExp)
            ])
        };
        state = {
            errorState: 0,
            errorMsg: ''
        };
        orderPromise = new OrderPromise();

        validate(value) {
            const {rule, api, errMsg} = this.props;
            const rules = Object.assign({}, RULES, api.rules);
            if (!this.validatePromise || this.prevValue !== value) {
                this.validatePromise = validate(value, {
                    rule, rules, errMsg, data: api.data
                }).then((res) => {
                    return res;
                });
            }
            this.prevValue = value;

            return this.orderPromise.add(this.validatePromise);
        }

        runValidate = async () => {
            const {name, api, label} = this.props,
                value = api.data[name];
            if (typeof value === 'string') {
                const newValue = value.trim();
                if (newValue !== value) {
                    api.onDataChange(name, newValue);
                }
            }

            this.setState({
                errorState: 3, errorMsg: ''
            });

            const res = await this.validate(value);

            this.orderPromise.clean();

            await new Promise((resolve) => {
                if (res.result) {
                    this.setState({
                        errorState: 1, errorMsg: ''
                    }, () => resolve());
                } else {
                    this.setState({
                        errorState: 2, errorMsg: compileErrMsg(res.errMsg, label)
                    }, () => resolve());
                }
            });

            return res;
        };

        validateChange = () => {
            const {api, name} = this.props;
            this.runValidate().then((res) => {
                api.onValidateChange(name, {
                    result: res.result, errorMsg: this.state.errorMsg
                });
            });
        };

        handlerChange = (event, value) => {
            const {name, onChange, api} = this.props;
            onChange && onChange(event, value);
            api.onDataChange(name, getFieldValue(event, value));//兼容以前api
        };

        componentDidMount() {
            const {name, api} = this.props;
            api.onFieldInstall(name, this);
        }

        componentWillUnmount() {
            const {name, api} = this.props;
            api.onFieldUninstall(name);
        }

        render() {
            const {name, rule, errMsg, api, ...props} = this.props;
            return <WrappedComponent {...props} value={api.data[name]}
                                     triggerValidate={this.validateChange}
                                     addEventListener={api.addEventListener}
                                     removeEventListener={api.removeEventListener}
                                     errorState={this.state.errorState}
                                     errorMsg={this.state.errorMsg}
                                     onChange={this.handlerChange}/>
        }
    }
});
