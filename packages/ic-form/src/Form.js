import React, {Component, PureComponent} from 'react'
import FormContext from './Context'
import cleanObject from './util/cleanObject'
import getFieldInfo from './util/getFieldInfo'
import merge from 'lodash/merge'
import {getCache, setCache, removeCache} from 'ic-cache'
import PropTypes from 'prop-types'

class Form extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onPrevSubmit: PropTypes.func,
        onError: PropTypes.func,
        cache: PropTypes.string,
        data: PropTypes.object,
        rules: PropTypes.object
    };
    handlerDataChange = (name, value) => {
        const {cache, onDataChange} = this.props;
        this.setState(({data}) => {
            const newData = cleanObject(Object.assign({}, data, {[name]: value}));
            return {data: newData};
        }, () => {
            cache && setCache(`form-cache-${cache}`, this.state.data);
            onDataChange && onDataChange(this.state.data);
            this.eventList.dataChange.forEach((callback) => callback(this.state.data));
        });
    };
    handlerValidateChange = async (name, res) => {
        const {onValidate} = this.props;
        this.fieldList[name].info = res;
        const pass = await this.isPass(), validateInfo = getFieldInfo(this.fieldList);
        onValidate && onValidate(pass, validateInfo, this.state.data);
        this.eventList.validate.forEach((callback) => callback(pass, validateInfo, this.state.data));
    };
    handlerFieldInstall = (name, field) => {
        this.fieldList[name] = {field, info: {}};
        //为了保证表单初始化后，isPass是一个正确的值
        field.validate(this.state.data[name]).then((res) => {
            if (res.result === true) {
                this.fieldList[name].info = {result: true};
            }
            return this.isPass();
        });
    };
    handlerFieldUninstall = (name) => {
        delete this.fieldList[name];

        this.setState(({data}) => {
            delete data[name];
            return {data};
        });
        this.handlerDataChange(name, undefined);
    };
    setData = (data = {}) => {
        this.setState({data});
    };
    getData = () => {
        return this.state.data;
    };
    submit = async () => {
        const {onSubmit, onPrevSubmit, onError, cache} = this.props,
            isPass = await this.isPass(true), validateInfo = getFieldInfo(this.fieldList);
        onPrevSubmit && onPrevSubmit(isPass, validateInfo, this.state.data);
        this.eventList.prevSubmit.forEach((callback) => callback(isPass, validateInfo, this.state.data));
        if (!isPass) {
            onError && onError(validateInfo);
            this.eventList.error.forEach((callback) => callback(validateInfo, this.state.data));
            return;
        }
        await Promise.all([
            Promise.resolve(onSubmit(this.state.data)), ...this.eventList.submit.map(async (callback) => await callback(this.state.data))
        ]);
        cache && removeCache(`form-cache-${cache}`);
    };
    addEventListener = (name, callback) => {
        const eventList = this.eventList[name];
        Array.isArray(eventList) && eventList.push(callback);
    };
    removeEventListener = (name, callback) => {
        const eventList = this.eventList[name];
        if (Array.isArray(eventList)) {
            const index = eventList.indexOf(callback);
            index > -1 && eventList.splice(index, 1);
        }
    };

    constructor(props) {
        super(props);
        this.fieldList = {};
        this.eventList = {
            submit: [],
            prevSubmit: [],
            error: [],
            validate: [],
            dataChange: []
        };
        const {cache, data} = props,
            localData = getCache(`form-cache-${cache}`),
            newData = merge({}, data);
        if (cache) {
            merge(newData, localData);
        }
        if (Object.keys(newData).length > 0) {
            this.state = {
                isPass: false,
                data: newData
            };
        }
    }

    async isPass(isForce = false) {
        let isPass = true;
        await Promise.all(Object.keys(this.fieldList).map(async (name) => {
            const {field, info} = this.fieldList[name];
            if (isForce) {
                const res = this.fieldList[name].info = await field.runValidate(this.state.data[name]);
                if (res.result === false) {
                    isPass = false;
                }
            } else if (info.result === false || info.result === undefined) {
                isPass = false;
            }
        }));
        this.setState({isPass});
        return isPass;
    }

    render() {
        const {rules, children} = this.props;
        return (
            <FormContext.Provider value={{
                data: this.state.data,
                rules,
                isPass: this.state.isPass,
                submit: this.submit,
                addEventListener: this.addEventListener,
                removeEventListener: this.removeEventListener,
                onFieldInstall: this.handlerFieldInstall,
                onFieldUninstall: this.handlerFieldUninstall,
                onDataChange: this.handlerDataChange,
                onValidateChange: this.handlerValidateChange
            }}>{children}</FormContext.Provider>
        );
    }
}

class FormApi extends PureComponent {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    setValue = (name, value) => {
        this.formRef.current.handlerDataChange(name, value);
    };

    forceValidate = () => {
        this.formRef.current.isPass(true);
    };

    submit = async () => {
        await this.formRef.current.submit();
        return this;
    };

    setError = async (name, {result = true, errMsg = ''}) => {
        await this.formRef.current.handlerValidateChange(name, {result, errMsg});
        return this;
    };

    set data(value) {
        this.formRef.current.setData(value);
    }

    get data() {
        return this.formRef.current.getData();
    }

    render() {
        return <Form {...this.props} ref={this.formRef}/>
    }
}

export default FormApi;
