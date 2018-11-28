import RULES,{presetRules} from '../../src/util/RULES'

describe('util/RULES.js', () => {
    it('REQ',()=>{
        const res=RULES.REQ(undefined);
        expect(res.result).toBe(false);
        expect(res.errMsg).toBe('');

        const res2=RULES.REQ(false);
        expect(res2.result).toBe(true);

        const res3=RULES.REQ({});
        expect(res3.result).toBe(false);

        const res4=RULES.REQ(0);
        expect(res4.result).toBe(true);

        const res5=RULES.REQ('');
        expect(res5.result).toBe(false);

        const res6=RULES.REQ([]);
        expect(res6.result).toBe(false);

        const res7=RULES.REQ([1,2,3]);
        expect(res7.result).toBe(true);

        const res8=RULES.REQ({test:'test'});
        expect(res8.result).toBe(true);
    });

    it('NAME',()=>{
        const res=RULES.NAME('');
        expect(res.result).toBe(true);
        expect(res.errMsg).toBe('');

        const res2=RULES.NAME(123);
        expect(res2.result).toBe(false);

        const res3=RULES.NAME(undefined);
        expect(res3.result).toBe(true);

        const res4=RULES.NAME('aaa');
        expect(res4.result).toBe(true);

        const res5=RULES.NAME('史蒂夫');
        expect(res5.result).toBe(true);

        const res6=RULES.NAME('aaa史蒂夫');
        expect(res6.result).toBe(true);
    });

    it('TEL',()=>{
        const res=RULES.TEL(18728377283);
        expect(res.result).toBe(true);
        const res2=RULES.TEL('18728377283');
        expect(res2.result).toBe(true);

        const res3=RULES.TEL('');
        expect(res3.result).toBe(true);
        expect(res3.errMsg).toBe('');

        const res4=RULES.TEL(undefined);
        expect(res4.result).toBe(true);

        const res5=RULES.TEL(true);
        expect(res5.result).toBe(false);

        const res6=RULES.TEL(28374855734);
        expect(res6.result).toBe(false);
    });

    it('EMAIL',()=>{
        const res=RULES.EMAIL('ssss@163.com');
        expect(res.result).toBe(true);

        const res2=RULES.EMAIL('ssss');
        expect(res2.result).toBe(false);
        expect(res2.errMsg).toBe('请输入有效的邮箱');

        const res3=RULES.EMAIL(122323);
        expect(res3.result).toBe(false);

        const res4=RULES.EMAIL(undefined);
        expect(res4.result).toBe(true);
    });

    it('LEN',()=>{
        const res=RULES.LEN('name',2,10);
        expect(res.result).toBe(true);

        const res2=RULES.LEN('namexxxxxxx',2,10);
        expect(res2.result).toBe(false);
        expect(res2.errMsg).toBe('%s长度必须小于10');

        const res3=RULES.LEN('n',2,10);
        expect(res3.result).toBe(false);
        expect(res3.errMsg).toBe('%s长度必须大于2');

        const res4=RULES.LEN('n',2);
        expect(res4.result).toBe(false);
        expect(res4.errMsg).toBe('%s长度必须大于2');
    });

    it('presetRules',()=>{
        const newRule=(value)=>{
            return {
                result:true,
                errMsg:''
            }
        };
        presetRules({
            NAME:newRule
        });

        expect(RULES.NAME).toBe(newRule);

        presetRules();
    });
});
