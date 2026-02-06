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

    // #region Throttle
    describe('Throttle', () => {
        test('throttle', (done) => {
            jest.useFakeTimers();
            const fn = jest.fn();
            const throttled = utils.throttle(fn, 1000);

            throttled();
            expect(fn).toHaveBeenCalledTimes(1);

            throttled();
            throttled();
            expect(fn).toHaveBeenCalledTimes(1);

            jest.advanceTimersByTime(1000);
            throttled();
            expect(fn).toHaveBeenCalledTimes(2);
            done();
        });
    });
    // #endregion

    // #region New String Utilities
    describe('New String Utils', () => {
        test('camelCase', () => {
            expect(utils.camelCase('hello world')).toBe('helloWorld');
            expect(utils.camelCase('hello-world')).toBe('helloWorld');
            expect(utils.camelCase('hello_world')).toBe('helloWorld');
            expect(utils.camelCase('')).toBe('');
        });

        test('snakeCase', () => {
            expect(utils.snakeCase('helloWorld')).toBe('hello_world');
            expect(utils.snakeCase('Hello World')).toBe('hello_world');
            expect(utils.snakeCase('')).toBe('');
        });

        test('kebabCase', () => {
            expect(utils.kebabCase('helloWorld')).toBe('hello-world');
            expect(utils.kebabCase('Hello World')).toBe('hello-world');
            expect(utils.kebabCase('')).toBe('');
        });

        test('escapeHtml', () => {
            expect(utils.escapeHtml('<script>alert("xss")</script>'))
                .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
            expect(utils.escapeHtml('')).toBe('');
        });

        test('unescapeHtml', () => {
            expect(utils.unescapeHtml('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'))
                .toBe('<script>alert("xss")</script>');
            expect(utils.unescapeHtml('')).toBe('');
        });

        test('stripHtml', () => {
            expect(utils.stripHtml('<p>Hello <strong>World</strong></p>')).toBe('Hello World');
            expect(utils.stripHtml('')).toBe('');
        });

        test('pad', () => {
            expect(utils.pad('5', 3, '0', 'left')).toBe('005');
            expect(utils.pad('hello', 10, '*', 'right')).toBe('hello*****');
            expect(utils.pad('hi', 6, '-', 'both')).toBe('--hi--');
        });
    });
    // #endregion

    // #region New Number Utilities
    describe('New Number Utils', () => {
        test('randomInt', () => {
            const result = utils.randomInt(1, 10);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(10);
            expect(Number.isInteger(result)).toBe(true);
        });

        test('round', () => {
            expect(utils.round(3.14159, 2)).toBe(3.14);
            expect(utils.round(2.5, 0)).toBe(3);
        });

        test('formatNumber', () => {
            const result = utils.formatNumber(1234567.89, 'en-US');
            expect(result).toContain('1,234,567');
        });
    });
    // #endregion

    // #region New Array Utilities
    describe('New Array Utils', () => {
        test('unique', () => {
            expect(utils.unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
            expect(utils.unique([])).toEqual([]);
        });

        test('uniqueBy', () => {
            const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
            const result = utils.uniqueBy(arr, x => x.id);
            expect(result).toEqual([{ id: 1 }, { id: 2 }]);
        });

        test('chunk', () => {
            expect(utils.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
            expect(utils.chunk([], 2)).toEqual([]);
        });

        test('flatten', () => {
            expect(utils.flatten([[1, 2], [3, [4]]], 1)).toEqual([1, 2, 3, [4]]);
            expect(utils.flatten([[1, 2], [3, [4]]], 2)).toEqual([1, 2, 3, 4]);
        });

        test('flattenDeep', () => {
            expect(utils.flattenDeep([[1, [2, [3, [4]]]]])).toEqual([1, 2, 3, 4]);
        });

        test('shuffle', () => {
            const arr = [1, 2, 3, 4, 5];
            const shuffled = utils.shuffle(arr);
            expect(shuffled).toHaveLength(5);
            expect(shuffled).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
        });

        test('partition', () => {
            expect(utils.partition([1, 2, 3, 4], x => x % 2 === 0))
                .toEqual([[2, 4], [1, 3]]);
        });
    });
    // #endregion

    // #region Object Utilities
    describe('Object Utils', () => {
        test('deepClone', () => {
            const obj = { a: { b: 1 }, c: [1, 2] };
            const cloned = utils.deepClone(obj);
            expect(cloned).toEqual(obj);
            expect(cloned).not.toBe(obj);
            expect(cloned.a).not.toBe(obj.a);
        });

        test('pick', () => {
            expect(utils.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']))
                .toEqual({ a: 1, c: 3 });
        });

        test('omit', () => {
            expect(utils.omit({ a: 1, b: 2, c: 3 }, ['b']))
                .toEqual({ a: 1, c: 3 });
        });

        test('deepMerge', () => {
            const result = utils.deepMerge({ a: { b: 1 } }, { a: { c: 2 } });
            expect(result).toEqual({ a: { b: 1, c: 2 } });
        });

        test('isEmpty', () => {
            expect(utils.isEmpty({})).toBe(true);
            expect(utils.isEmpty([])).toBe(true);
            expect(utils.isEmpty('')).toBe(true);
            expect(utils.isEmpty(null)).toBe(true);
            expect(utils.isEmpty({ a: 1 })).toBe(false);
        });
    });
    // #endregion

    // #region Async Utilities
    describe('Async Utils', () => {
        test('sleep', async () => {
            jest.useRealTimers();
            const start = Date.now();
            await utils.sleep(50);
            const elapsed = Date.now() - start;
            expect(elapsed).toBeGreaterThanOrEqual(40);
        }, 1000);

        test('retry - success', async () => {
            jest.useRealTimers();
            let attempts = 0;
            const fn = async () => {
                attempts++;
                if (attempts < 2) throw new Error('fail');
                return 'success';
            };
            const result = await utils.retry(fn, { attempts: 3, delay: 5 });
            expect(result).toBe('success');
            expect(attempts).toBe(2);
        }, 1000);

        test('retry - failure', async () => {
            jest.useRealTimers();
            const fn = async () => { throw new Error('fail'); };
            await expect(utils.retry(fn, { attempts: 2, delay: 5 }))
                .rejects.toThrow('fail');
        }, 1000);

        test('timeout - resolves', async () => {
            jest.useRealTimers();
            const promise = Promise.resolve('success');
            const result = await utils.timeout(promise, 1000);
            expect(result).toBe('success');
        });

        test('timeout - rejects', async () => {
            jest.useRealTimers();
            const promise = new Promise(resolve => setTimeout(() => resolve('late'), 200));
            await expect(utils.timeout(promise, 50))
                .rejects.toThrow('Promise timed out');
        }, 1000);
    });
    // #endregion

    // #region DOM Utilities
    describe('DOM Utils', () => {
        test('getQueryParams', () => {
            expect(utils.getQueryParams('?foo=bar&baz=qux'))
                .toEqual({ foo: 'bar', baz: 'qux' });
        });

        test('buildQueryString', () => {
            expect(utils.buildQueryString({ foo: 'bar', baz: 'qux' }))
                .toBe('foo=bar&baz=qux');
        });

        test('ready', (done) => {
            utils.ready(() => {
                expect(document.readyState).not.toBe('loading');
                done();
            });
        });
    });
    // #endregion

    // #region Storage Utilities
    describe('Storage Utils', () => {
        beforeEach(() => {
            localStorage.clear();
            sessionStorage.clear();
        });

        test('localStorage set/get/remove', () => {
            utils.setLocalStorage('test', { foo: 'bar' });
            expect(utils.getLocalStorage('test')).toEqual({ foo: 'bar' });

            utils.removeLocalStorage('test');
            expect(utils.getLocalStorage('test')).toBeNull();
        });

        test('localStorage with fallback', () => {
            expect(utils.getLocalStorage('nonexistent', 'default')).toBe('default');
        });

        test('sessionStorage set/get/remove', () => {
            utils.setSessionStorage('test', { foo: 'bar' });
            expect(utils.getSessionStorage('test')).toEqual({ foo: 'bar' });

            utils.removeSessionStorage('test');
            expect(utils.getSessionStorage('test')).toBeNull();
        });

        test('sessionStorage with fallback', () => {
            expect(utils.getSessionStorage('nonexistent', 'default')).toBe('default');
        });
    });
    // #endregion

});
