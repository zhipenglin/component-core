import getFieldInfo from '../../src/util/getFieldInfo'

describe('util/getFieldInfo.js',()=>{
    it('普通测试',()=>{
        expect(getFieldInfo({
            'field-0':{
                info:"1"
            },
            'field-1':{
                info:"2"
            }
        })).toEqual({
            'field-0':"1",
            'field-1':"2"
        });
    });
});
