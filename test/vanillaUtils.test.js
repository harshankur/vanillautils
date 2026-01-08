const utils = require('../vanillaUtils');

describe('VanillaUtils', () => {

    // #region Strings
    describe('String Utils', () => {
        test('capitalize', () => {
            expect(utils.capitalize('hello')).toBe('Hello');
            expect(utils.capitalize('')).toBe('');
        });

        test('slugify', () => {
            expect(utils.slugify('Hello World')).toBe('hello-world');
            expect(utils.slugify('  Hello   World  ')).toBe('hello-world');
            expect(utils.slugify('Hello@World!')).toBe('helloworld');
        });

        test('truncate', () => {
            expect(utils.truncate('Hello World', 5)).toBe('Hello...');
            expect(utils.truncate('Hello', 10)).toBe('Hello');
        });
    });
    // #endregion

    // #region Numbers
    describe('Number Utils', () => {
        test('clamp', () => {
            expect(utils.clamp(10, 0, 5)).toBe(5);
            expect(utils.clamp(-5, 0, 5)).toBe(0);
            expect(utils.clamp(3, 0, 5)).toBe(3);
        });

        test('formatCurrency', () => {
            // Note: Exact output depends on locale implementation in environment, 
            // but we can check basic structure
            const result = utils.formatCurrency(1000, 'USD', 'en-US');
            expect(result).toContain('$');
            expect(result).toContain('1,000');
        });
    });
    // #endregion

    // #region Validation
    describe('Validation', () => {
        test('isValidEmail', () => {
            expect(utils.isValidEmail('test@example.com')).toBe(true);
            expect(utils.isValidEmail('invalid-email')).toBe(false);
        });

        test('isValidUrl', () => {
            expect(utils.isValidUrl('https://google.com')).toBe(true);
            expect(utils.isValidUrl('invalid-url')).toBe(false);
        });
    });
    // #endregion

    // #region Array Helpers
    describe('Array Helpers', () => {
        test('sum', () => {
            expect(utils.sum([1, 2, 3])).toBe(6);
            expect([1, 2, 3].sum()).toBe(6);
        });

        test('max', () => {
            expect(utils.max([1, 2, 3])).toBe(3);
            expect([1, 2, 3].max()).toBe(3);
        });

        test('min', () => {
            expect(utils.min([1, 2, 3])).toBe(1);
            expect([1, 2, 3].min()).toBe(1);
        });

        test('groupBy', () => {
            const arr = [1.1, 1.2, 2.1];
            const fn = Math.floor;
            // Standalone
            expect(utils.groupBy(arr, fn)).toEqual({ '1': [1.1, 1.2], '2': [2.1] });
            // Prototype
            expect(arr.groupBy(fn)).toEqual({ '1': [1.1, 1.2], '2': [2.1] });
        });
    });
    // #endregion

    // #region DOM
    describe('DOM Utils', () => {
        test('createElement', () => {
            const el = utils.createElement('div', { id: 'test', class: 'foo' });
            expect(el.tagName).toBe('DIV');
            expect(el.id).toBe('test');
            expect(el.className).toBe('foo');
        });


    });
    // #endregion

    // #region Async
    describe('Async Utils', () => {
        test('toPromise', async () => {
            const fn = (a) => a + 1;
            const result = await utils.toPromise(fn, [1]);
            expect(result).toBe(2);
        });

        test('debounce', (done) => {
            jest.useFakeTimers();
            const fn = jest.fn();
            const debounced = utils.debounce(fn, 1000);

            debounced();
            debounced();
            debounced();

            expect(fn).not.toHaveBeenCalled();

            jest.runAllTimers();

            expect(fn).toHaveBeenCalledTimes(1);
            done();
        });
    });
    // #endregion

    // #region Cookies
    describe('Cookies', () => {
        test('set/get/remove cookie', () => {
            // Note: jsdom handles document.cookie partially
            utils.setCookie('testCookie', 'testValue', { secure: false });
            expect(utils.getCookie('testCookie')).toBe('testValue');

            utils.removeCookie('testCookie');
            expect(utils.getCookie('testCookie')).toBe('');
        });
    });
    // #endregion

});
