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
      hideSign: false,
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
        isInit: false,
        isLoading: false,
        isComplete: false
      };
    }

    getData = (refresh) => {
      return Promise.resolve().then(() => {
        if (refresh === true) {
          return new Promise((reslove) => {
            this.setState({
              list: [],
              results: null,
              currentPage: this.props.startIndex,
              isInit: false,
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
          cancelHandler: (cancelHandler) => {
            this.cancelHandler = cancelHandler;
          },
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
              isComplete: list && list.length === 0 || (!Number.isNaN(Number(countAll)) ? countAll <= newList.length : this.state.isComplete)
            });
            onSuccess && onSuccess(data);
          }, onComplete: (...args) => {
            this.setState({
              isInit: true
            });
            onComplete && onComplete(...args);
          }, options, cache, getResults
        }));
      });
    };

    refresh = () => {
      this.getData(true);
    };

    componentDidMount() {
      this.getData();
    }

    componentDidUpdate({params, data}) {
      if (!(isEqual(params, this.props.params) && isEqual(data, this.props.data))) {
        this.refresh();
      }
    }

    componentWillUnmount() {
      this.cancelHandler && this.cancelHandler();
    }

    render() {
      const {loading, complete, empty, hideSign} = this.props, sign = <span>
        {this.state.isLoading ? loading : null}
        {this.state.isComplete ? (this.state.list.length > 0 ? complete : empty) : null}
      </span>;

      return (
        <Fragment>
          {this.state.isInit === false ?
            null :
            <WrappedComponent {...omit(this.props, ['loading', 'complete', 'empty', 'pageKey', 'pageSizeKey', 'startIndex', 'defaultList', 'pageSize', 'getResults', 'onError', 'onStart', 'onSuccess', 'cancelHandler', 'onComplete'])}
                              list={this.state.list} isLoading={this.state.isLoading}
                              isComplete={this.state.isComplete}
                              results={this.state.results}
                              sign={sign}
                              load={this.getData}
                              refresh={this.refresh}
                              clean={getAjaxData.clean}/>}
          {!hideSign || this.state.isInit === false ? sign : null}
        </Fragment>
      );
    }
  }
};

export default (ajax) => {
  const listLoader = createListLoader(globCache, ajax);
  listLoader.createCacheDynamic = (cache = new Cache()) => createListLoader(cache, ajax);
  listLoader.Cache = Cache;
  listLoader.cleanCache = (...args) => globCache.clean(...args);
  return listLoader;
}
