import {stringify,parse} from '../index'

describe('parse',()=>{
    it('默认',()=>{
        expect(parse('a:1:2:3,b:4:5:6')).toEqual({
            a:["1","2","3"],
            b:["4","5","6"]
        });
    });
    it('格式化',()=>{
        expect(parse('a:1:2:3,b:4:5:6',['value-0','value-1','value-2'])).toEqual({
            a:{
                'value-0':"1",
                'value-1':"2",
                'value-2':"3"
            },
            b:{
                'value-0':"4",
                'value-1':"5",
                'value-2':"6"
            }
        });
    });
});


describe('stringify',()=>{
    it('默认',()=>{
        expect(stringify({a:[1,2,3],b:[4,5,6]})).toBe('a:1:2:3,b:4:5:6');
    });
    it('最简',()=>{
        expect(stringify({a:'abc',b:'edf'})).toBe('a:abc,b:edf');
    });
    it('格式化',()=>{
        expect(stringify({a:{"value-0":1,"value-1":2,"value-2":3},b:{"value-0":4,"value-1":5,"value-2":6}},['value-0','value-1','value-2'])).toBe('a:1:2:3,b:4:5:6');
    });
});
