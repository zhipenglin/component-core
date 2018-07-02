import OrderPromise from '../../src/util/OrderPromise'

describe('util/OrderPromise.js',()=>{
    it('前一个promise先于后一个promise返回，结果都为后一次返回结果',()=>{
        const orderPromise=new OrderPromise();
        return Promise.all([
            orderPromise.add(new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve('promise-0');
                },300);
            })),
            orderPromise.add(new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve('promise-1');
                },600);
            }))
        ]).then(([res0,res1])=>{
            expect(res0).toBe('promise-1');
            expect(res1).toBe('promise-1');
        }).then(()=>{
            expect(orderPromise.promiseList.length).toBe(2);
            orderPromise.clean();
            expect(orderPromise.promiseList.length).toBe(0);
        });
    });
    it('后一个promise先于前一个promise返回，结果都为后一次返回结果',()=>{
        const orderPromise=new OrderPromise();
        return Promise.all([
            orderPromise.add(new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve('promise-0');
                },500);
            })),
            orderPromise.add(new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve('promise-1');
                },300);
            }))
        ]).then(([res0,res1])=>{
            expect(res0).toBe('promise-1');
            expect(res1).toBe('promise-1');
        });
    });
    it('前一个promise返回reject,后一个promise正常返回，结果都为后一次返回结果',()=>{
        const orderPromise=new OrderPromise();
        return Promise.all([
            orderPromise.add(new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    reject('promise-0');
                },500);
            })),
            orderPromise.add(new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve('promise-1');
                },300);
            }))
        ]).then(([res0,res1])=>{
            expect(res0).toBe('promise-1');
            expect(res1).toBe('promise-1');
        });
    });
});
