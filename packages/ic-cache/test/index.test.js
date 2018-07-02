import {setCache, getCache, removeCache} from '../src/index'

describe('ic-cache/index.js', () => {
    it('设置缓存，数据为object', () => {
        window.localStorage = {
            setItem: jest.fn()
        };
        const obj = {
            name: '123',
            age: 15
        };
        setCache('test-key', obj);
        expect(window.localStorage.setItem.mock.calls[0][0]).toBe('test-key');
        expect(JSON.parse(window.localStorage.setItem.mock.calls[0][1])).toEqual(obj);
    });

    it('设置缓存，数据为string', () => {
        window.localStorage = {
            setItem: jest.fn()
        };
        const str = '测试字符串';
        setCache('test-key', str);
        expect(window.localStorage.setItem.mock.calls[0][1]).toBe(str);
    });

    it('取出缓存，数据为object', () => {
        const obj = {
            name: '123',
            age: 15
        };
        window.localStorage = {
            getItem: jest.fn(() => JSON.stringify(obj))
        };
        const res = getCache('test-key');
        expect(window.localStorage.getItem.mock.calls[0][0]).toBe('test-key');
        expect(res).toEqual(obj);
    });

    it('取出缓存，数据为string', () => {
        const string = 'testing'
        window.localStorage = {
            getItem: jest.fn(() => string)
        };
        const res = getCache('test-key', false);
        expect(res).toBe(string);
    });

    it('取出缓存，数据为string，没有显式指定isObject', () => {
        const string = 'testing'
        window.localStorage = {
            getItem: jest.fn(() => string)
        };
        const res = getCache('test-key');
        expect(res).toEqual({});
    });

    it('获取没有数据的key', () => {
        window.localStorage = {
            getItem: jest.fn(() => undefined)
        };
        const res = getCache('test-key');
        expect(res).toEqual({});
    });

    it('删除缓存', () => {
        window.localStorage = {
            removeItem: jest.fn()
        };

        removeCache('test-key');
        expect(window.localStorage.removeItem.mock.calls[0][0]).toBe('test-key');
    });
});
