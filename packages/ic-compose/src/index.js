/**
 * @name: ic-compose ;
 * @author: linzp ;
 * @description: 实现方法的调用串联 ;
 * */

export default function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}