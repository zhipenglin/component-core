import ajax,{Filter,createInstance} from '../src/index'
import qs from 'qs'

const mockXHR=(callback=()=>{})=>{
    const xhrMockClass = () => {
        let onreadystatechange = () => {
        }, request = {
            headers: {}
        };
        const mock = {
            readyState: 0,
            open: jest.fn((methed, url) => {
                request.methed = methed;
                request.url = url;
            }),
            send: jest.fn((data) => {
                request.data = data;
                callback(({response,status}) => {
                    Object.assign(mock, {
                        readyState: 4,
                        status: 200,
                        response: {},
                        responseText: ''
                    }, {
                        response, responseText: typeof response === 'object' ? JSON.stringify(response) : response,
                        status
                    });
                    onreadystatechange();
                });
            }),
            setRequestHeader: jest.fn((key, value) => {
                request.headers[key] = value;
            })
        };
        Object.defineProperty(mock, 'onreadystatechange', {
            set: (value) => {
                onreadystatechange = value;
            }
        });
        return mock;
    };
    return jest.fn().mockImplementation(xhrMockClass);
};

describe('ic-ajax',()=>{
    it('发送普通ajax post请求，收到正常响应',()=>{
        const returnData={
            err_no:0,
            results:{
                name:'test'
            }
        };
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                response:returnData
            });
        });
        return ajax.post('/test',{
            data:{
                name:'123'
            }
        }).then((respose)=>{
            expect(respose.config.url).toBe('/test');
            expect(respose.config.method.toLowerCase()).toBe('post');
            expect(respose.config.data).toBe(qs.stringify({
                data:{
                    name:'123'
                }
            }));
            expect(respose.data).toEqual(returnData);
        });
    });
    it('发送普通ajax get请求，收到正常响应',()=>{
        const returnData={
            err_no:0,
            results:{
                name:'test'
            }
        };
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                response:returnData
            });
        });
        return ajax.get('/test?a=123').then((respose)=>{
            expect(respose.config.url).toBe('/test?a=123');
            expect(respose.config.method.toLowerCase()).toBe('get');
            expect(respose.data).toEqual(returnData);
        });
    });
    it('发送普通ajax get请求，收到错误响应',()=>{
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                status:500
            });
        });
        return ajax.get('/test?a=123').then((respose)=>{
            expect(respose.status).toBe(500);
        });
    });
    it('添加单过滤器，修改请求url',()=>{
        const returnData={
            err_no:0,
            results:{
                name:'test'
            }
        };
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                response:returnData
            });
        });

        class TestFilter extends Filter{
            request(config){
                config.url='/test?a=345';
                return super.request(config);
            }
        }

        return ajax.get('/test?a=123',{
            filter:TestFilter
        }).then((respose)=>{
            expect(respose.config.url).toBe('/test?a=345');
        });
    });
    it('添加单过滤器，修改返回值，报错时返回正常报错信息',()=>{
        const returnData={
            err_no:500,
            err_msg:'我是一个错误'
        };
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                response:returnData
            });
        });

        class TestFilter extends Filter{
            response(response){
                response.data={
                    err_no:200,
                    results:{
                        name:'test'
                    }
                };
                return super.request(response);
            }
        }

        return ajax.get('/test?a=123',{
            filter:TestFilter
        }).then((respose)=>{
            expect(respose.data).toEqual(returnData);
        });
    });
    it('添加多过滤器，修改请求url和返回值',()=>{
        const returnData={
            err_no:0,
            results:{
                name:'test'
            }
        };
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                response:returnData
            });
        });

        class TestFilter extends Filter{
            request(config){
                config.url='/test?a=345';
                return super.request(config);
            }
        }

        class TestFilter2 extends Filter{
            response(respose){
                respose.data.results.age=44;
                return super.response(respose);
            }
        }

        return ajax.get('/test?a=123',{
            filter:[TestFilter,TestFilter2]
        }).then((respose)=>{
            expect(respose.config.url).toBe('/test?a=345');
            expect(respose.data).toEqual({
                err_no:0,
                results:{
                    name:'test',
                    age:44
                }
            });
        });
    });
    it('减查错误信息返回',()=>{
        const returnData={
            err_no:500,
            err_msg:'我是一个错误'
        };
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                response:returnData
            });
        });
        return ajax.get('/test?a=123').then((respose)=>{
            expect(respose.errMsg).toBe(returnData.err_msg);
        });
    });
    it('发送请求忽略错误处理',()=>{
        const returnData={
            err_no:500,
            err_msg:'我是一个错误'
        };
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                response:returnData
            });
        });
        return ajax.get('/test?a=123',{
            ignoreError:true
        }).then((respose)=>{
            expect(!!respose.errMsg).toBe(false);
        });
    });
    it('添加预设',()=>{
        const returnData={
            err_no:0,
            results:{
                name:'test'
            }
        };
        window.XMLHttpRequest=mockXHR((setXHR)=>{
            setXHR({
                response:returnData
            });
        });
        const newAjax=createInstance((ajax)=>{
            ajax.interceptors.request.use((config)=>{
                config.headers.test='test';
                return config;
            });
        });

        return newAjax.get('/test?a=123').then((respose)=>{
            expect.objectContaining({
                test:'test'
            });
            expect(respose.config.headers).toHaveProperty("test","test");
        });
    });
});
