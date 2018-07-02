import React, {PureComponent} from 'react'
import FormContext from './Context'
import cleanObject from './util/cleanObject'
import getFieldInfo from './util/getFieldInfo'
import merge from 'lodash/merge'
import {getCache, setCache, removeCache} from 'ic-cache'

class Form extends PureComponent {
    state = {
        isPass: false,
        data: {}
    };
    handlerDataChange = (name, value) => {
        const {cache, onDataChange} = this.props;
        this.setState({
            data: cleanObject(Object.assign({}, this.state.data, {[name]: value}))
        }, () => {
            cache && setCache(`form-cache-${cache}`, this.state.data);
            onDataChange && onDataChange(this.state.data);
        });
    };
    handlerValidateChange = async (name, res) => {
        const {onValidate} = this.props;
        this.fieldList[name].info = res;
        onValidate && onValidate(await this.isPass(), res, this.state.data);
    };
    handlerFieldInstall = (name, field) => {
        this.fieldList[name] = {field, info: {}};
    };
    handlerFieldUninstall = (name) => {
        delete this.fieldList[name];
        this.handlerDataChange(name, undefined);
    };
    setData = (data = {}) => {
        this.setState({data}, () => this.isPass());
    };
    getData = () => {
        return this.state.data;
    };
    submit = async () => {
        const {onSubmit, onPrevSubmit, onError, cache} = this.props,
            isPass = await this.isPass(true), validateInfo = getFieldInfo(this.fieldList);
        onPrevSubmit && onPrevSubmit(isPass, validateInfo, this.state.data);
        if (!isPass) {
            onError && onError(validateInfo);
            return;
        }
        onSubmit(this.state.data);
        cache && removeCache(`form-cache-${cache}`);
    };

    constructor(props) {
        super(props);
        this.fieldList = {};
    }

    componentDidMount() {
        const {cache, data} = this.props;
        let localData = getCache(`form-cache-${cache}`);
        const newData = merge({}, data);
        if (cache) {
            merge(newData, localData);
        }

        if (Object.keys(newData).length > 0) {
            this.setData(newData);
        }
    }

    async isPass(isForce = false) {
        let isPass = true;
        await Promise.all(Object.keys(this.fieldList).map(async (name)=>{
            const {field, info} = this.fieldList[name];
            if (isForce || info.result === undefined) {
                if((await field.validateChange(this.state.data[name])).result === false){
                    isPass = false;
                }
            } else if (info.result === false) {
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
                onFieldInstall: this.handlerFieldInstall,
                onFieldUninstall: this.handlerFieldUninstall,
                onDataChange: this.handlerDataChange,
                onValidateChange: this.handlerValidateChange
            }}>{children}</FormContext.Provider>
        );
    }
}

class FormApi extends PureComponent {
    submit = async () => {
        await this.form.submit();
        return this;
    };

    setError = async (name, {result = true, errMsg = ''}) => {
        await this.form.handlerValidateChange(name, {result, errMsg});
        return this;
    };

    set data(value) {
        this.form.setData(value);
    }

    get data() {
        return this.form.getData();
    }

    render() {
        return <Form {...this.props} ref={this.form}/>
    }
}

export default FormApi;
