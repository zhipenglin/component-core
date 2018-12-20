import React, {PureComponent} from 'react'
import isEqual from 'lodash/isEqual'
import Cache, {globCache} from './Cache'
import createGetData from './createGetData'

const createDynamic = (currentCache, ajax) => (WrappedComponent) => {
    const getAjaxData = createGetData(currentCache, ajax);
    return class Dynamic extends PureComponent {
        static defaultProps = {
            loading: null,
            error: null,
            cache: false,
            getResults: (data) => {
                if (data.hasOwnProperty('err_no') && data.hasOwnProperty('results')) {
                    return {err_no: data.err_no, results: data.results};
                }
                return data;
            }
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
            const {url, params, data, onError, onStart, onSuccess, onComplete, options, cache, getResults} = this.props;
            return getAjaxData({
                url, params, data,
                onError: (e) => {
                    onError && onError(e);
                    this.setState({isError: true});
                },
                onStart: () => {
                    this.setState({isError: false, isLoading: true}, () => onStart && onStart());
                },
                onSuccess: (data) => {
                    this.setState({
                        isLoading: false, results: getResults(data).results
                    });
                    onSuccess && onSuccess(data);
                }, onComplete, options, cache, getResults
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

export default (ajax) => {
    const dynamic = createDynamic(globCache, ajax);
    dynamic.createCacheDynamic = (cache = new Cache()) => createDynamic(cache);
    dynamic.Cache = Cache;
    dynamic.cleanCache = () => {
        globCache.clean();
    };
    return dynamic;
};
