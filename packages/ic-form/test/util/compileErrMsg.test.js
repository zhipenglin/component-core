import compileErrMsg from '../../src/util/compileErrMsg'

describe('util/compileErrMsg.js',()=>{
    it('string错误输入',()=>{
        expect(compileErrMsg('%s不能为空','姓名')).toBe('姓名不能为空');
    });
    it('function错误输入',()=>{
        const fn=jest.fn((s)=>s+'不能为空');
        expect(compileErrMsg(fn,'姓名')).toBe('姓名不能为空');
    });
});
