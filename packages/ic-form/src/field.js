import React, {PureComponent} from 'react'
import FormContext from './Context'
import RULES from './util/RULES'
import validate from './util/validate'
import compileErrMsg from './util/compileErrMsg'
import OrderPromise from './util/OrderPromise'

export default (WrappedComponent) => {
    class Field extends PureComponent {
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
                    rule, rules, errMsg
                }).then((res) => {
                    return res;
                });
            }
            this.prevValue = value;

            return this.orderPromise.add(this.validatePromise);
        }

        validateChange = async () => {
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

            await new Promise((resolve)=>{
                if (res.result) {
                    this.setState({
                        errorState: 1, errorMsg: ''
                    },()=>resolve());
                } else {
                    this.setState({
                        errorState: 2, errorMsg: compileErrMsg(res.errMsg, label)
                    },()=>resolve());
                }
            });

            api.onValidateChange(name, {
                result:res.result,errorMsg:this.state.errorMsg
            });
            return res;
        };

        handlerBlur = (e) => {
            const {onBlur} = this.props;
            onBlur && onBlur(e);
            this.validateChange();
        };

        handlerChange = (value) => {
            const {name, onChange, api} = this.props;
            onChange && onChange(value);
            api.onDataChange(name, value);
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
                                     errorState={this.state.errorState}
                                     errorMsg={this.state.errorMsg}
                                     onChange={this.handlerChange}
                                     onBlur={this.handlerBlur}/>
        }
    }

    return (props) => <FormContext.Consumer>
        {fieldProps => <Field {...props} api={fieldProps}/>}
    </FormContext.Consumer>
};
