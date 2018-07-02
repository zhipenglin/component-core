import validate from '../../src/util/validate'

const consoleErrorMock=window.console.error = jest.fn();

describe('util/validate.js', () => {
    const rules = {
        REQ: (value) => {
            return {
                result: !!value,
                errMsg: '不能为空'
            };
        }
    };

    it('自定义function校验，校验通过', async () => {
        const res =await validate('string', {
            rule: (value) => {
                return true;
            }
        });
        expect(res.result).toBe(true);
        expect(res.errMsg).toBe('');
    });

    it('自定义function校验，校验不通过',async () => {
        const res =await validate('string', {
            rule: (value) => {
                return false;
            },
            errMsg: '错误原因'
        });
        expect(res.result).toBe(false);
        expect(res.errMsg).toBe('错误原因');
    });

    it('自定义正则校验，校验通过',async () => {
        const res =await validate('string', {
            rule: /string/
        });
        expect(res.result).toBe(true);
        expect(res.errMsg).toBe('');
    });

    it('自定义正则校验，校验不通过',async () => {
        const res =await validate('string', {
            rule: /sss/
        });
        expect(res.result).toBe(false);
        expect(res.errMsg).toBe('');
    });

    it('规则校验（REQ，function），校验通过',async () => {
        const res =await validate('string', {
            rule: 'REQ',
            rules
        });
        expect(res.result).toBe(true);
    });

    it('规则校验（REQ，function），校验不通过',async () => {
        const res =await validate(null, {
            rule: 'REQ',
            rules
        });
        expect(res.result).toBe(false);
        expect(res.errMsg).toBe('不能为空');
    });

    it('规则校验（REQ，function），校验不通过，指定错误信息',async () => {
        const res =await validate(null, {
            rule: 'REQ',
            rules,
            errMsg: '我是指定错误信息'
        });

        expect(res.result).toBe(false);
        expect(res.errMsg).toBe('我是指定错误信息');
    });

    it('无效的规则类型',async () => {
        const res =await validate(null, {
            rule: {},
            rules,
            errMsg: '我是指定错误信息'
        });
        expect(res.result).toBe(true);
        expect(res.errMsg).toBe('');
    });

    it('无效的规则',async () => {
        const res =await validate(null, {
            rule: 'WEQ',
            rules,
            errMsg: '我是指定错误信息'
        });
        expect(res.result).toBe(true);
        expect(res.errMsg).toBe('');
        expect(consoleErrorMock.mock.calls.length).toBe(1);
    });
});
