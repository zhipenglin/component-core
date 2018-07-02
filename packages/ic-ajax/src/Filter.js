export default class Filter {
    static getInstance(...args) {
        if (false === this.instance instanceof this) {
            this.instance = new this(...args);
        }
        return this.instance;
    }

    static filterIterator(filter, callback,isReverse) {
        let promise = Promise.resolve(), list = [];
        if (filter) {
            if (filter.prototype instanceof Filter) {
                list.push(filter);
            } else if (Array.isArray(filter)) {
                filter.forEach(item => {
                    if (item.prototype instanceof Filter) {
                        list.push(item);
                    }
                });
            }
            if(isReverse){
                list=list.reverse();
            }
            list.forEach(item => {
                promise = promise.then(() => {
                    return callback(item.getInstance());
                });
            });
        }
        return promise;
    }

    request(config) {
        return Promise.resolve(config);
    }

    response(response) {
        return Promise.resolve(response);
    }
}
