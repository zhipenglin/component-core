import validate from '../../src/util/validate'

describe('util/validate.js',()=>{
    const rules={
        REQ:(value)=>{
            return {
                result:!!value,
                errMsg:'不能为空'
            }
        }
    };

    it('非空校验，校验通过',()=>{
        const res=validate('string',{
            rule:'REQ',
            rules
        });
        expect(res.result).toBe(true);
    });
});
