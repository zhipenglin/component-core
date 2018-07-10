import React, {PureComponent} from 'react'
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import hash from 'object-hash'

class Cache{
    static getId({url,params,data,method,baseURL,headers}){
        return Symbol.for(hash({url,params,data,method,baseURL,headers}));
    }
    constructor(){
        this.__cache={};
    }
    get allCache(){
        return Object.assign({},this.__cache);
    }
    getCache(id){
        if(typeof id!=='symbol'){
            id=this.constructor.getId(id);
        }
        return this.__cache[id];
    }
    append(key,value){
        this.__cache[this.constructor.getId(key)]=value;
        return this;
    }
    clean(){
        this.__cache={};
        return this;
    }
}

let globCache = new Cache();

const createDynamic=(currentCache,ajax)=>(WrappedComponent) => {
    let ajaxWithCache = (props) => {
        const cache=currentCache.getCache(props);
        if(cache){
            return cache;
        }else{
            const promise=ajax(props);
            currentCache.append(props,promise);
            return promise;
        }
    };
    return class Dynamic extends PureComponent {
        static defaultProps = {
            loading: null,
            error: null,
            cache:false
        };

        constructor(props) {
            super(props);
            this.cancelHandler = () => {
            };
        }

        state = {
            results: null,
            isError: false,
            isLoading: true
        };
        changeResults = (results) => {
            this.setState({results});
        };
        getData = () => {
            const {url, params, data, onError, onSuccess, onComplete, options,cache} = this.props;
            this.setState({isError: false, isLoading: true});
            this.cancelHandler();
            let cancelToken = new axios.CancelToken((cancelHandler) => {
                this.cancelHandler = cancelHandler
            });
            (cache?ajaxWithCache:ajax)({
                url, params, data, cancelToken, ...options
            }).then(({data}) => {
                const {err_no, results} = data;
                if (err_no == '0') {
                    this.setState({
                        isLoading: false, results
                    });
                    onSuccess && onSuccess(data);
                } else {
                    return Promise.reject(new Error(data));
                }
            }).catch((e) => {
                if(!axios.isCancel(e)){
                    onError && onError(e);
                    this.setState({isError: true});
                }
            }).then(() => {
                onComplete && onComplete();
            });
        };

        componentDidMount() {
            this.getData();
        }

        componentDidUpdate({params, data}) {
            if (!(isEqual(params, this.props.params) && isEqual(data, this.props.data))) {
                this.getData();
            }
        }

        componentWillUnmount() {
            this.cancelHandler();
        }

        render() {
            const {loading, error, ...args} = this.props;
            if (this.state.isError) {
                return error;
            }
            if (this.state.isLoading) {
                return loading;
            } else {
                return <WrappedComponent {...args} results={this.state.results} changeResults={this.changeResults}
                                         getData={this.getData}/>
            }
        }
    }
};

export default (ajax)=>{
    const dynamic=createDynamic(globCache,ajax);
    dynamic.createCacheDynamic=(cache=new Cache())=>createDynamic(cache);
    dynamic.Cache=Cache;
    dynamic.cleanCache=()=>{
        globCache.clean();
    };
};
