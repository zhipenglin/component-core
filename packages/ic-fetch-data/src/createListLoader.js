import React, {PureComponent, Fragment} from 'react'
import Cache, {globCache} from './Cache'
import get from 'lodash/get'
import omit from 'lodash/omit'
import createGetData from './createGetData'
import isEqual from "lodash/isEqual";

const createListLoader = (currentCache, ajax) => (WrappedComponent) => {
    const getAjaxData = createGetData(currentCache, ajax);
    return class ListLoader extends PureComponent {
        static defaultProps = {
            loading: null,
            complete: null,
            empty: null,
            cache: false,
            pageKey: 'page',
            pageSizeKey: 'pageSize',
            startIndex: 1,
            defaultList: [],
            pageSize: 10,
            getResults: (data) => {
                if (data.hasOwnProperty('err_no') && data.hasOwnProperty('results')) {
                    return {
                        err_no: data.err_no,
                        results: get(data, 'results'),
                        list: get(data, 'results.list'),
                        countAll: get(data, 'results.count_all')
                    };
                }
                return data;
            }
        };

        constructor(props) {
            super(props);
            this.pageSize = this.props.pageSize;
            this.state = {
                list: this.props.defaultList,
                results: null,
                currentPage: this.props.startIndex,
                isLoading: false,
                isComplete: false
            }
        }

        getData = (refresh) => {
            return Promise.resolve().then(() => {
                if (refresh === true) {
                    return new Promise((reslove) => {
                        this.setState({
                            list: [],
                            results: null,
                            currentPage: this.props.startIndex,
                            isLoading: false,
                            isComplete: false
                        }, reslove);
                    });
                }
            }).then(() => {
                const {url, params, data, onError, onStart, onSuccess, onComplete, options, cache, getResults, pageSizeKey, pageKey} = this.props;
                const mixinProps = (target) => Object.assign({}, target, {
                    [pageSizeKey]: this.pageSize,
                    [pageKey]: this.state.currentPage
                });
                if (this.state.isLoading) {
                    return;
                }
                if (this.state.isComplete) {
                    return;
                }

                return new Promise((resolve) => {
                    this.setState({
                        isLoading: true
                    }, resolve)
                }).then(() => getAjaxData({
                    url, params: mixinProps(params), data: mixinProps(data),
                    onError: (e) => {
                        onError && onError(e);
                        this.setState({isLoading: false});
                    },
                    onStart: () => {
                        this.setState({isLoading: true}, () => onStart && onStart());
                    },
                    onSuccess: (data) => {
                        const {list, results, countAll} = getResults(data),
                            newList = [...this.state.list, ...(list || [])];
                        this.setState({
                            isLoading: false,
                            currentPage: this.state.currentPage + 1,
                            results,
                            list: newList,
                            isComplete: countAll && countAll <= newList.length
                        });
                        onSuccess && onSuccess(data);
                    }, onComplete, options, cache, getResults
                }));
            });
        };

        componentDidMount() {
            this.getData();
        }

        componentDidUpdate({params, data}) {
            if (!(isEqual(params, this.props.params) && isEqual(data, this.props.data))) {
                this.getData(true);
            }
        }

        render() {
            const {loading, complete, empty} = this.props;
            return (
                <Fragment>
                    <WrappedComponent {...omit(this.props, ['loading', 'complete', 'cache', 'pageKey', 'pageSizeKey', 'startIndex', 'defaultList', 'pageSize', 'getResults', 'url', 'params', 'data', 'onError', 'onStart', 'onSuccess', 'onComplete', 'options'])}
                                      list={this.state.list} isLoading={this.state.isLoading}
                                      results={this.state.results} load={this.getData}/>
                    {this.state.isLoading ? loading : null}
                    {this.state.isComplete ? this.state.list.length > 0 ? complete : empty : null}
                </Fragment>
            );
        }
    }
};

export default (ajax) => {
    const listLoader = createListLoader(globCache, ajax);
    listLoader.createCacheDynamic = (cache = new Cache()) => createListLoader(cache);
    listLoader.Cache = Cache;
    listLoader.cleanCache = () => {
        globCache.clean();
    };
    return listLoader;
}
