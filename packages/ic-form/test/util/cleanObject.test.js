import cleanObject from '../../src/util/cleanObject'

describe('util/cleanObject.js', () => {
    it("普通对象测试", () => {
        const obj = {
            key0: undefined,
            key1: '123',
            key3: 123,
            key4: null,
            key5: false,
            key6: {
                test: 'test'
            }
        };
        expect(cleanObject(obj)).toEqual({
            key1: '123',
            key3: 123,
            key4: null,
            key5: false,
            key6: {
                test: 'test'
            }
        });
    });

    it("空测试", () => {
        expect(cleanObject()).toEqual({});
    });
});
