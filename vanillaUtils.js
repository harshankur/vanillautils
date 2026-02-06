(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.vanillaUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    /***********************************************************************************************
     *                                       VANILLAUTILS.JS                                       *
     * A COLLECTION OF UTILITY FUNCTIONS THAT CAN BE USED IN DEVELOPMENT OF ANY FRONTEND PROJECTS. *
     *                                     AUTHOR: HARSH ANKUR                                     *
     ***********************************************************************************************/


    // #region DOM Manipulation


    /**
     * Creates an element with a given attribute map in the argument for a given tagName.
     * @param   {string}               tagName         A tag name for this new element to be created.
     * @param   {Object.<string, any>} [attributes={}] We will use this object's keys as attributes for the element and its values as the attribute values.
     * 
     * @returns {HTMLElement}
     * 
     * @example
     * const attributes = {
     *     class: 'class1 class2',
     *     id: 'id1',
     *     style: '{ display: "flex"; }',
     *     'data-region': 'Germany'
     * };
     * const element = createElement('div', attributes);
     * // <div class="class1 class2" id="id1" style="{ display: "flex"; }" data-region="Germany"></div>
     * @example
     * const attributes = {
     *     href: 'https://blog.harshankur.com',
     *     target: '_blank'
     * };
     * const element = createElement('a', attributes);
     * // <a href="https://blog.harshankur.com" target="_blank"></a>
     * @global
     */
    function createElement(tagName, attributes = {}) {
        // Create element
        const element = document.createElement(tagName);
        // Add all the attributes.
        for (let key in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
        return element;
    }

    /**
     * Opens the link provided in the argument 'url'. Based on the other argument 'newTab', it either opens it in the same tab or in a new tab.
     * NOTE: In the case of trying to open this url in a new tab, the browser might first ask the user to enable popups for this website instead of directly opening the link.
     * @param   {string}  url            The url that you want to open on the client's browser.
     * @param   {boolean} [newTab=false] Flag whether to open this url in a new tab. Please note that passing this true might get the new link (popup) blocked depending on the browser settings.
     * 
     * @returns {void}
     * 
     * @example openLink("https://github.com/harshankur", true);
     * @global
     */
    function openLink(url, newTab = false) {
        const element = createElement('a', { href: url, target: newTab ? '_blank' : '_self' });
        element.click();
        element.remove();
    }

    /**
     * Downloads the content of the url passed in the argument.
     * NOTE: You can only trigger download of a url which is in the same domain as the current one.
     * There is Cross-Site access for downloads.
     * If you pass a url from another domain, the browser usually just opens the file on the same tab which might result in loss of unsaved data in the current page.
     * @param   {string} url The url from which you wish to trigger a content download.
     * 
     * @returns {void}
     * 
     * @example downloadLink("https://mirror.harshankur.com/vanillaUtils.min.js");
     * @global
     */
    function downloadLink(url) {
        const element = createElement('a', { href: url, download: url.split('/').pop() });
        element.click();
        element.remove();
    }



    // #endregion

    // #region File & Mime Types


    /**
     * Guess the MIME type based on the initial bytes of a file.
     * @param   {Uint8Array} bytes The byte array representing the file content.
     * 
     * @returns {string}           The guessed MIME type or 'application/octet-stream' if unknown.
     * @global
     */
    function guessMimeType(bytes) {
        /**
         * Known file signatures mapped to their corresponding MIME types.
         * @type {Object.<string, string>}
         */
        const signatures = {
            // Images
            "89504E47": "image/png",
            "47494638": "image/gif",
            "FFD8FF": "image/jpeg",
            "49492A00": "image/tiff",
            "4D4D002A": "image/tiff",
            "424D": "image/bmp",
            "52494646": "image/webp",
            // Documents
            "25504446": "application/pdf",
            "504B0304": "application/zip",
            "504B34": "application/vnd.openxmlformats-officedocument",
            "D0CF11E0": "application/msword", // DOC, XLS, PPT
            // Archives
            "377ABCAF271C": "application/7z",
            "1F8B08": "application/gzip",
            "526172211A07": "application/x-rar-compressed",
            "7573746172": "application/x-tar",
            // Video
            "000000": "video/mp4", // Partial match, needs more specific check
            "1A45DFA3": "video/webm",
            "52494646": "video/avi", // Note: Conflicts with WEBP, needs context
            "6674797069736F6D": "video/mp4",
            // Audio
            "494433": "audio/mpeg", // MP3
            "FFFB": "audio/mpeg", // MP3
            "FFF3": "audio/mpeg", // MP3
            "FFF2": "audio/mpeg", // MP3
            "52494646": "audio/wav", // Note: Conflicts with WEBP/AVI
            "664C6143": "audio/flac",
            "4F676753": "audio/ogg"
        };

        /**
         * Converts a byte array to a hexadecimal string.
         * @param   {Uint8Array} byteArray The byte array to convert.
         * @returns {string}               The hexadecimal string representation of the byte array.
         */
        const getHexString = (byteArray) => {
            return Array.from(byteArray)
                .map(byte => byte.toString(16).padStart(2, '0').toUpperCase())
                .join('');
        };

        // Get the hexadecimal string representation of the byte array.
        const bytesHex = getHexString(bytes);

        // Check each known signature to see if the file's bytes start with it.
        for (const [signature, mimeType] of Object.entries(signatures)) {
            if (bytesHex.startsWith(signature)) {
                return mimeType;
            }
        }

        // Return a default MIME type if no match is found.
        return 'application/octet-stream';
    }

    /**
     * Saves the content of the byteArray passed in the argument with its filename passed in the argument.
     * @param   {Uint8Array} bytes  File bytes.
     * @param   {string}     name   The name of the file in the download
     * @param   {string}     [type] File Mimetype
     * 
     * @returns {void}
     * 
     * @example downloadFileFromBytes(<bytes>, 'myFile.pdf');
     * @global
     */
    function downloadFileFromBytes(bytes, name, type) {
        const blob = new Blob([bytes], { type: type ?? guessMimeType(bytes) });
        const url = window.URL.createObjectURL(blob);
        const element = createElement('a', { 'href': url, 'download': name });
        element.click();
        element.remove();
        window.URL.revokeObjectURL(url);
    }


    // #endregion

    // #region API Request Manager


    /** @typedef {Object} FetchConfig
     * @property {'DELETE'
     *            | 'GET'
     *            | 'POST'
     *            | 'PUT'}                             [method]         Method of the fetch call. Default is **'GET'**.
     * @property {'json'
     *            | 'text'
     *            | 'blob'
     *            | 'arrayBuffer'
     *            | 'auto'}                            [responseType]   Expected response type. Default is **'auto'** which auto-detects based on Content-Type header.
     * @property {'no-cors'
     *            | 'cors'
     *            | 'navigate'
     *            | 'websocket'
     *            | 'same-origin'}                     [mode]           Cross-Origin Mode. Default is **'cors'** if the fetch is created using Request constructor. Otherwise it is **'no-cors'**.
     * @property {'default'
     *            | 'no-cache'
     *            | 'reload'
     *            | 'force-cache'
     *            | 'only-if-cached'}                  [cache]          Cache Policy. Default is **'default'**.
     * @property {'include'
     *            | 'same-origin'
     *            | 'omit'}                            [credentials]    Credentials Policy. Default is **'same-origin'**.
     * @property {'manual'
     *            | 'follow'
     *            | 'error'}                           [redirect]       Redirect Policy. Default is **'follow'**.
     * @property {'no-referrer'
     *             | 'no-referrer-when-downgrade'
     *             | 'origin'
     *             | 'origin-when-cross-origin'
     *             | 'same-origin'
     *             | 'strict-origin'
     *             | 'strict-origin-when-cross-origin'
     *             | 'unsafe-url'}                     [referrerPolicy] Refferer Policy. Default is **'no-referrer-when-downgrade'**.
     * @property {object}                              [headers]        Header for this fetch request. Default is an empty object.
     * @property {object | string}                     [body]           Body for this fetch request. Body data type must match "Content-Type" header.
     */

    /**
     * Fetch handler for a request with body.
     * @param   {string}      url         Url to make this fetch request.
     * @param   {FetchConfig} [config={}] Config for this fetch request.
     * 
     * @returns {Promise<any>}            Returns a Promise for the fetch request.
     * 
     * @example
     * fetchRequest('https://mirror.harshankur.com/vanillaUtils.min.js')
     * // GET https://mirror.harshankur.com/vanillaUtils.min.js
     * @example
     * const params = {
     *     method: 'POST',
     *     header: {
     *         'Content-Type': 'application/json'
     *     },
     *     body: JSON.stringify({ name: "Harsh Ankur" })
     * };
     * fetchRequest('https://post-example.com/registerName', params);
     * // POST https://post-example.com/registerName -H "Content-Type: application/json" -d '{ "name": "Harsh Ankur" }'
     * @global
     */
    function fetchRequest(url, config = {}) {
        // Validation
        if (url == undefined)
            return Promise.reject("Improper request. Needs a url.");

        // Local Config Object.
        const internalConfig = { ...config };
        internalConfig.method = internalConfig.method ?? 'GET';
        const responseType = config.responseType ?? 'auto';

        // Execute fetch call and return promise.
        return fetch(url, internalConfig)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }

                // Handle response based on type
                if (responseType === 'auto') {
                    // Auto-detect based on Content-Type header
                    const contentType = response.headers.get('content-type') || '';
                    if (contentType.includes('application/json')) {
                        return response.json();
                    } else if (contentType.includes('text/')) {
                        return response.text();
                    } else if (contentType.includes('image/') || contentType.includes('application/octet-stream')) {
                        return response.blob();
                    } else {
                        return response.text();
                    }
                } else if (responseType === 'json') {
                    return response.json();
                } else if (responseType === 'text') {
                    return response.text();
                } else if (responseType === 'blob') {
                    return response.blob();
                } else if (responseType === 'arrayBuffer') {
                    return response.arrayBuffer();
                }
            });
    }


    // #endregion

    // #region Cookies


    /** @typedef {Object} CookieConfig
     * @property {number}  [expires]  Number of DAYS after which this cookie will be expired. If not specified, it would mean that the cookie is session-specific.
     * @property {string}  [path]     Indicates the path that must exist in the requested URL for the browser to send the Cookie header (e.g., '/', '/mydir'). If not specified, it defaults to the current path of the current document location.
     * @property {string}  [samesite] Prevents the browser from sending this cookie along with cross-site requests. Possible values are lax, strict or none. Strict prevents from sending to cross-site requests. Lax allows a few basic cross-site requests but prevents many Cross-Site Requesst Forgery attacks. Default is None which implies no restriction.
     * @property {boolean} [secure]   Specifies that the cookie should only be transmitted over a secure protocol. Default is **true** which would mean that this cookie will be sent over only in secure communications.
     */


    /**
     * Sets cookie on the browser for the given key and value for the given duration
     * @param   {string}       key    Key of the cookie
     * @param   {string}       value  Value to be set for this cookie
     * @param   {CookieConfig} [config={}] [OPTIONAL] Configuration for settings cookies
     * 
     * @returns {void}
     * 
     * @example setCookie("key1", "value1");
     * // Setting session specific cookie for key1: value1
     * @example setCookie("key2", "value2", { expires: 30, path: '/' });
     * // Setting key2: value2 cookie on the root domain that expires in 30 days.
     * @global
     */
    function setCookie(key, value, config = {}) {
        // Cookie string text
        let cookieText = `${key}=${value}`;
        // Set expiry days
        if (config.expires != undefined) {
            // Get expiry date in ms.
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (config.expires * 24 * 60 * 60 * 1000));
            // Append the string for expiry date
            cookieText += `;expires=${expiryDate.toGMTString()}`;
        }
        // Set path
        if (config.path != undefined)
            cookieText += `;path=${config.path}`;
        // Set samesite restrictions
        if (config.samesite != undefined)
            cookieText += `;samesite=${config.samesite}`;
        // Set secure text unless it is explicitly set as false.
        if (config.secure != false)
            cookieText += `;secure`;

        // Set cookie to the document.
        document.cookie = cookieText;
    }

    /**
     * Fetches cookie value for a given key.
     * @param   {string} key Key of the cookie.
     * 
     * @returns {string}     Value of the cookie for the corresponding key.
     * 
     * @example const storedValue = getCookie("key1");
     * // "value1"
     * @example const storedValue = getCookie("key2");
     * // "value2"
     * @global
     */
    function getCookie(key) {
        // Get cookie text
        const cookies = decodeURIComponent(document.cookie).split(';').map(text => text.trim());
        const found = cookies.find(cookie => cookie.indexOf(key + '=') == 0);
        if (!found)
            return "";

        // We slice the found cookie string from the length of the key + 1 for = text.
        return found.slice(key.length + 1);
    }

    /**
     * Remove cookie for a given key.
     * @param   {string} key Key of the cookie
     * 
     * @returns {void}
     * 
     * @example getCookie("key1");
     * // "value1"
     * removeCookie("key1");
     * getCookie("key1");
     * // ""
     * @global
     */
    function removeCookie(key) {
        // Set cookie expiry to the current time so it expires immediately after.
        document.cookie = `${key}=;expires=${(new Date()).toGMTString()};path=/`;
    }


    // #endregion

    // #region Asynchronous Functions


    /**
     * This takes a function and returns a promisied version of it.
     * Basically it resolves after this fn is executed.
     * It is helpful primarily when one is switching over multiple cases and some of them do not return a promise but it is easier to handle all the cases in promises.
     * @param   {function}     fn   Function that is needed to be promisied.
     * @param   {any[]}        args Array of arguments to be called for this function.
     * 
     * @returns {Promise<any>}      Promise that will be resolved once the fn function is executed.
     * @global
     */
    function toPromise(fn, args) {
        return new Promise((res, _) => { res(fn(...args)) });
    }

    /**
     * Debounces a function, i.e., ignored repeated calls for a function. It rather takes the last call while it is waiting.
     * @param {function}  fn      Function needed to debounce
     * @param {number}    t       milliseconds delay for debouncing.
     * @param {Object}    [options={}] Configuration options.
     * @param {boolean}   [options.immediate=false] If true, trigger the function on the leading edge instead of the trailing edge.
     * @return {function}
     * @global
     */
    function debounce(fn, t, options = {}) {
        let scheduled = undefined;
        return function (...args) {
            const callNow = options.immediate && !scheduled;
            if (scheduled)
                clearTimeout(scheduled);
            scheduled = setTimeout(() => {
                scheduled = undefined;
                if (!options.immediate)
                    fn(...args);
            }, t);
            if (callNow)
                fn(...args);
        }
    }


    /**
     * Throttles a function, ensuring it is called at most once per specified time period.
     * Unlike debounce, throttle guarantees the function will execute at regular intervals during repeated calls.
     * @param {function}  fn      Function needed to throttle
     * @param {number}    delay   milliseconds delay for throttling.
     * @param {Object}    [options={}] Configuration options.
     * @param {boolean}   [options.leading=true] If true, trigger the function on the leading edge.
     * @param {boolean}   [options.trailing=true] If true, trigger the function on the trailing edge.
     * @return {function}
     * 
     * @example
     * const throttled = throttle(() => console.log('scroll'), 100);
     * window.addEventListener('scroll', throttled);
     * @global
     */
    function throttle(fn, delay, options = {}) {
        let lastCall = 0;
        let scheduled = undefined;
        const leading = options.leading !== false;
        const trailing = options.trailing !== false;

        return function (...args) {
            const now = Date.now();
            const timeSinceLastCall = now - lastCall;

            if (!lastCall && !leading) {
                lastCall = now;
            }

            if (timeSinceLastCall >= delay) {
                if (scheduled) {
                    clearTimeout(scheduled);
                    scheduled = undefined;
                }
                lastCall = now;
                fn(...args);
            } else if (!scheduled && trailing) {
                scheduled = setTimeout(() => {
                    lastCall = leading ? Date.now() : 0;
                    scheduled = undefined;
                    fn(...args);
                }, delay - timeSinceLastCall);
            }
        };
    }


    // #endregion

    // #region Strings

    /**
     * Capitalizes the first letter of a string.
     * @param   {string} str The string to capitalize.
     * @returns {string}     The string with its first character converted to uppercase.
     * 
     * @example capitalize("hello world") 
     * // "Hello world"
     * @global
     */
    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Truncates a string to a specified length and adds an ellipsis (...) if it exceeds that length.
     * @param   {string} str    The string to truncate.
     * @param   {number} length The maximum length of the string before truncation.
     * @returns {string}        The truncated string with '...' appended if truncated.
     * 
     * @example truncate("Hello World", 5) 
     * // "Hello..."
     * @global
     */
    function truncate(str, length) {
        if (!str || str.length <= length) return str;
        return str.slice(0, length) + '...';
    }

    /**
     * Converts a string into a URL-friendly slug.
     * Converts to lowercase, removes non-word characters, and replaces spaces with dashes.
     * @param   {string} str The string to slugify.
     * @returns {string}     The clean, slugified string.
     * 
     * @example slugify("Hello World!") 
     * // "hello-world"
     * @global
     */
    function slugify(str) {
        if (!str) return '';
        return str.toString().toLowerCase()
            .trim()
            .replace(/\s+/g, '-')     // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-');  // Replace multiple - with single -
    }

    /**
     * Converts a string to camelCase.
     * @param   {string} str The string to convert.
     * @returns {string}     The camelCase string.
     * 
     * @example camelCase("hello world") 
     * // "helloWorld"
     * @example camelCase("hello-world") 
     * // "helloWorld"
     * @example camelCase("hello_world") 
     * // "helloWorld"
     * @global
     */
    function camelCase(str) {
        if (!str) return '';
        return str.toString().toLowerCase()
            .trim()
            .replace(/[\s_-]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
    }

    /**
     * Converts a string to snake_case.
     * @param   {string} str The string to convert.
     * @returns {string}     The snake_case string.
     * 
     * @example snakeCase("helloWorld") 
     * // "hello_world"
     * @example snakeCase("Hello World") 
     * // "hello_world"
     * @global
     */
    function snakeCase(str) {
        if (!str) return '';
        return str.toString()
            .trim()
            .replace(/([A-Z])/g, '_$1')
            .replace(/[\s-]+/g, '_')
            .replace(/^_+/, '')
            .replace(/_+/g, '_')
            .toLowerCase();
    }

    /**
     * Converts a string to kebab-case.
     * @param   {string} str The string to convert.
     * @returns {string}     The kebab-case string.
     * 
     * @example kebabCase("helloWorld") 
     * // "hello-world"
     * @example kebabCase("Hello World") 
     * // "hello-world"
     * @global
     */
    function kebabCase(str) {
        if (!str) return '';
        return str.toString()
            .trim()
            .replace(/([A-Z])/g, '-$1')
            .replace(/[\s_]+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+/g, '-')
            .toLowerCase();
    }

    /**
     * Escapes HTML special characters to prevent XSS attacks.
     * @param   {string} str The string to escape.
     * @returns {string}     The escaped string with HTML entities.
     * 
     * @example escapeHtml("<script>alert('xss')</script>") 
     * // "&lt;script&gt;alert('xss')&lt;/script&gt;"
     * @global
     */
    function escapeHtml(str) {
        if (!str) return '';
        const htmlEscapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        return str.toString().replace(/[&<>"'\/]/g, char => htmlEscapeMap[char]);
    }

    /**
     * Unescapes HTML entities back to their original characters.
     * @param   {string} str The string with HTML entities to unescape.
     * @returns {string}     The unescaped string.
     * 
     * @example unescapeHtml("&lt;script&gt;alert('xss')&lt;/script&gt;") 
     * // "<script>alert('xss')</script>"
     * @global
     */
    function unescapeHtml(str) {
        if (!str) return '';
        const htmlUnescapeMap = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#x27;': "'",
            '&#x2F;': '/'
        };
        return str.toString().replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g, entity => htmlUnescapeMap[entity]);
    }

    /**
     * Removes all HTML tags from a string, leaving only the text content.
     * @param   {string} str The string containing HTML tags.
     * @returns {string}     The string with all HTML tags removed.
     * 
     * @example stripHtml("<p>Hello <strong>World</strong></p>") 
     * // "Hello World"
     * @global
     */
    function stripHtml(str) {
        if (!str) return '';
        return str.toString().replace(/<[^>]*>/g, '');
    }

    /**
     * Pads a string to a specified length with a given character.
     * @param   {string} str       The string to pad.
     * @param   {number} length    The target length of the padded string.
     * @param   {string} [char=' '] The character to use for padding. Default is space.
     * @param   {string} [direction='right'] The direction to pad ('left', 'right', or 'both').
     * @returns {string}           The padded string.
     * 
     * @example pad("5", 3, "0", "left") 
     * // "005"
     * @example pad("hello", 10, "*", "right") 
     * // "hello*****"
     * @example pad("hi", 6, "-", "both") 
     * // "--hi--"
     * @global
     */
    function pad(str, length, char = ' ', direction = 'right') {
        if (!str) str = '';
        str = str.toString();
        if (str.length >= length) return str;

        const padLength = length - str.length;
        const padChar = char.toString().charAt(0);

        if (direction === 'left') {
            return padChar.repeat(padLength) + str;
        } else if (direction === 'both') {
            const leftPad = Math.floor(padLength / 2);
            const rightPad = padLength - leftPad;
            return padChar.repeat(leftPad) + str + padChar.repeat(rightPad);
        } else {
            return str + padChar.repeat(padLength);
        }
    }

    // #endregion

    // #region Numbers & Validation

    /**
     * Clamps a number between a minimum and maximum value.
     * @param   {number} num The number to clamp.
     * @param   {number} min The minimum allowed value.
     * @param   {number} max The maximum allowed value.
     * @returns {number}     The clamped value.
     * 
     * @example clamp(100, 0, 50) 
     * // 50
     * @global
     */
    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }

    /**
     * Formats a number as a currency string.
     * @param   {number} amount          The number to format.
     * @param   {string} [currency='USD'] The currency code (e.g., 'USD', 'EUR').
     * @param   {string} [locale='en-US'] The locale string (e.g., 'en-US', 'de-DE').
     * @returns {string}                 The formatted currency string.
     * 
     * @example formatCurrency(1234.56) 
     * // "$1,234.56"
     * @global
     */
    function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
    }

    /**
     * Generates a random integer between min and max (inclusive).
     * @param   {number} min The minimum value (inclusive).
     * @param   {number} max The maximum value (inclusive).
     * @returns {number}     A random integer between min and max.
     * 
     * @example randomInt(1, 10) 
     * // 7 (random number between 1 and 10)
     * @global
     */
    function randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Rounds a number to a specified number of decimal places.
     * @param   {number} num      The number to round.
     * @param   {number} decimals The number of decimal places.
     * @returns {number}          The rounded number.
     * 
     * @example round(3.14159, 2) 
     * // 3.14
     * @example round(2.5, 0) 
     * // 3
     * @global
     */
    function round(num, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(num * factor) / factor;
    }

    /**
     * Formats a number with locale-specific thousands separators and decimal points.
     * @param   {number} num          The number to format.
     * @param   {string} [locale='en-US'] The locale string (e.g., 'en-US', 'de-DE').
     * @returns {string}              The formatted number string.
     * 
     * @example formatNumber(1234567.89) 
     * // "1,234,567.89"
     * @example formatNumber(1234567.89, 'de-DE') 
     * // "1.234.567,89"
     * @global
     */
    function formatNumber(num, locale = 'en-US') {
        return new Intl.NumberFormat(locale).format(num);
    }

    /**
     * Checks if a string is a valid email address.
     * Uses a simple regex for basic validation.
     * @param   {string} email The email string to check.
     * @returns {boolean}      True if valid, false otherwise.
     * 
     * @example isValidEmail("test@example.com") 
     * // true
     * @global
     */
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Checks if a string is a valid URL.
     * @param   {string} url The URL string to check.
     * @returns {boolean}    True if valid, false otherwise.
     * 
     * @example isValidUrl("https://google.com") 
     * // true
     * @global
     */
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    // #endregion

    // #region Array Helpers (Standalone + Prototype)

    /**
     * Calculates the sum of an array of numbers.
     * @param   {number[]} arr The array of numbers to sum.
     * @returns {number}       The total sum.
     * 
     * @example sum([1, 2, 3]) 
     * // 6
     * @global
     */
    function sum(arr) {
        return arr.reduce((acc, v) => acc + v, 0);
    }

    /**
     * Finds the maximum number in an array.
     * @param   {number[]} arr The array to search.
     * @returns {number}       The maximum value.
     * 
     * @example max([1, 5, 2]) 
     * // 5
     * @global
     */
    function max(arr) {
        return Math.max(...arr);
    }

    /**
     * Finds the minimum number in an array.
     * @param   {number[]} arr The array to search.
     * @returns {number}       The minimum value.
     * 
     * @example min([1, 5, 2]) 
     * // 1
     * @global
     */
    function min(arr) {
        return Math.min(...arr);
    }

    /**
     * Groups items of an array based on a key returned by a callback function.
     * @param   {Array}    arr The array to group.
     * @param   {function} fn  The callback function that returns the key to group by.
     * @returns {object}       An object where keys are the groups and values are arrays of items.
     * 
     * @example groupBy([1.1, 1.2, 2.1], Math.floor) 
     * // { '1': [1.1, 1.2], '2': [2.1] }
     * @global
     */
    function groupBy(arr, fn) {
        const res = {};
        arr.forEach(val => {
            const key = fn(val);
            const existingVal = res[key];
            if (existingVal)
                existingVal.push(val);
            else
                res[key] = [val];
        });
        return res;
    }

    /**
     * Removes duplicate values from an array.
     * @param   {Array} arr The array to process.
     * @returns {Array}     A new array with duplicate values removed.
     * 
     * @example unique([1, 2, 2, 3, 1]) 
     * // [1, 2, 3]
     * @global
     */
    function unique(arr) {
        return [...new Set(arr)];
    }

    /**
     * Removes duplicate values from an array based on a key function.
     * @param   {Array}    arr The array to process.
     * @param   {function} fn  The function that returns the key to compare for uniqueness.
     * @returns {Array}        A new array with duplicates removed based on the key function.
     * 
     * @example uniqueBy([{id: 1}, {id: 1}, {id: 2}], x => x.id) 
     * // [{id: 1}, {id: 2}]
     * @global
     */
    function uniqueBy(arr, fn) {
        const seen = new Set();
        return arr.filter(item => {
            const key = fn(item);
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    /**
     * Splits an array into chunks of a specified size.
     * @param   {Array}  arr  The array to split.
     * @param   {number} size The size of each chunk.
     * @returns {Array}       An array of chunks.
     * 
     * @example chunk([1, 2, 3, 4, 5], 2) 
     * // [[1, 2], [3, 4], [5]]
     * @global
     */
    function chunk(arr, size) {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }

    /**
     * Flattens a nested array to a specified depth.
     * @param   {Array}  arr   The array to flatten.
     * @param   {number} depth The depth to flatten to. Default is 1.
     * @returns {Array}        The flattened array.
     * 
     * @example flatten([[1, 2], [3, [4]]], 1) 
     * // [1, 2, 3, [4]]
     * @example flatten([[1, 2], [3, [4]]], 2) 
     * // [1, 2, 3, 4]
     * @global
     */
    function flatten(arr, depth = 1) {
        if (depth === 0) return arr.slice();
        return arr.reduce((acc, val) => {
            return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
        }, []);
    }

    /**
     * Recursively flattens a nested array to a single level.
     * @param   {Array} arr The array to flatten.
     * @returns {Array}     The completely flattened array.
     * 
     * @example flattenDeep([[1, [2, [3, [4]]]]) 
     * // [1, 2, 3, 4]
     * @global
     */
    function flattenDeep(arr) {
        return arr.reduce((acc, val) => {
            return acc.concat(Array.isArray(val) ? flattenDeep(val) : val);
        }, []);
    }

    /**
     * Randomly shuffles an array using the Fisher-Yates algorithm.
     * @param   {Array} arr The array to shuffle.
     * @returns {Array}     A new shuffled array.
     * 
     * @example shuffle([1, 2, 3, 4, 5]) 
     * // [3, 1, 5, 2, 4] (random order)
     * @global
     */
    function shuffle(arr) {
        const result = arr.slice();
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    /**
     * Splits an array into two groups based on a predicate function.
     * @param   {Array}    arr The array to partition.
     * @param   {function} fn  The predicate function that returns true or false.
     * @returns {Array}        An array containing two arrays: [truthyValues, falsyValues].
     * 
     * @example partition([1, 2, 3, 4], x => x % 2 === 0) 
     * // [[2, 4], [1, 3]]
     * @global
     */
    function partition(arr, fn) {
        const truthy = [];
        const falsy = [];
        arr.forEach(item => {
            if (fn(item)) {
                truthy.push(item);
            } else {
                falsy.push(item);
            }
        });
        return [truthy, falsy];
    }

    // #endregion

    // #region Object Utilities

    /**
     * Creates a deep clone of an object or array.
     * @param   {*} obj The object to clone.
     * @returns {*}     A deep copy of the object.
     * 
     * @example deepClone({a: {b: 1}}) 
     * // {a: {b: 1}} (new object)
     * @global
     */
    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => deepClone(item));
        if (obj instanceof Object) {
            const clonedObj = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    clonedObj[key] = deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }

    /**
     * Creates a new object with only the specified keys from the source object.
     * @param   {Object}   obj  The source object.
     * @param   {string[]} keys Array of keys to pick from the object.
     * @returns {Object}        A new object with only the specified keys.
     * 
     * @example pick({a: 1, b: 2, c: 3}, ['a', 'c']) 
     * // {a: 1, c: 3}
     * @global
     */
    function pick(obj, keys) {
        const result = {};
        keys.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = obj[key];
            }
        });
        return result;
    }

    /**
     * Creates a new object without the specified keys from the source object.
     * @param   {Object}   obj  The source object.
     * @param   {string[]} keys Array of keys to omit from the object.
     * @returns {Object}        A new object without the specified keys.
     * 
     * @example omit({a: 1, b: 2, c: 3}, ['b']) 
     * // {a: 1, c: 3}
     * @global
     */
    function omit(obj, keys) {
        const result = { ...obj };
        keys.forEach(key => {
            delete result[key];
        });
        return result;
    }

    /**
     * Deep merges multiple objects into a target object.
     * @param   {Object}    target  The target object to merge into.
     * @param   {...Object} sources The source objects to merge from.
     * @returns {Object}            The merged object.
     * 
     * @example deepMerge({a: {b: 1}}, {a: {c: 2}}) 
     * // {a: {b: 1, c: 2}}
     * @global
     */
    function deepMerge(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (typeof target === 'object' && typeof source === 'object') {
            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                        if (!target[key]) target[key] = {};
                        deepMerge(target[key], source[key]);
                    } else {
                        target[key] = source[key];
                    }
                }
            }
        }

        return deepMerge(target, ...sources);
    }

    /**
     * Checks if a value is empty (works for objects, arrays, strings, null, undefined).
     * @param   {*}       value The value to check.
     * @returns {boolean}       True if the value is empty, false otherwise.
     * 
     * @example isEmpty({}) 
     * // true
     * @example isEmpty([]) 
     * // true
     * @example isEmpty("") 
     * // true
     * @example isEmpty({a: 1}) 
     * // false
     * @global
     */
    function isEmpty(value) {
        if (value == null) return true;
        if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    }

    // #endregion

    // #region Async Utilities (Additional)

    /**
     * Returns a promise that resolves after a specified number of milliseconds.
     * Useful for adding delays in async functions.
     * @param   {number} ms The number of milliseconds to sleep.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     * 
     * @example await sleep(1000); // Wait 1 second
     * @global
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Retries an async function a specified number of times with a delay between attempts.
     * @param   {function} fn      The async function to retry.
     * @param   {Object}   [options={}] Configuration options.
     * @param   {number}   [options.attempts=3] The maximum number of attempts.
     * @param   {number}   [options.delay=1000] The delay in milliseconds between attempts.
     * @returns {Promise<any>}     The result of the function if successful.
     * 
     * @example await retry(() => fetch('/api'), { attempts: 3, delay: 1000 });
     * @global
     */
    async function retry(fn, options = {}) {
        const attempts = options.attempts ?? 3;
        const delay = options.delay ?? 1000;

        for (let i = 0; i < attempts; i++) {
            try {
                return await fn();
            } catch (error) {
                if (i === attempts - 1) throw error;
                await sleep(delay);
            }
        }
    }

    /**
     * Wraps a promise with a timeout, rejecting if the promise doesn't resolve within the specified time.
     * @param   {Promise} promise The promise to wrap.
     * @param   {number}  ms      The timeout in milliseconds.
     * @returns {Promise<any>}    The result of the promise if it resolves in time.
     * 
     * @example await timeout(fetch('/api'), 5000); // Timeout after 5 seconds
     * @global
     */
    function timeout(promise, ms) {
        return Promise.race([
            promise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Promise timed out')), ms)
            )
        ]);
    }

    // #endregion

    // #region DOM Utilities (Additional)

    /**
     * Executes a function when the DOM is fully loaded.
     * @param   {function} fn The function to execute when the DOM is ready.
     * @returns {void}
     * 
     * @example ready(() => console.log('DOM ready'));
     * @global
     */
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    /**
     * Parses URL query parameters into an object.
     * @param   {string} [url=window.location.search] The URL or query string to parse. Defaults to current page query string.
     * @returns {Object}                              An object containing the query parameters.
     * 
     * @example getQueryParams('?foo=bar&baz=qux') 
     * // {foo: 'bar', baz: 'qux'}
     * @global
     */
    function getQueryParams(url) {
        const queryString = url ?? (typeof window !== 'undefined' ? window.location.search : '');
        const params = {};
        const searchParams = new URLSearchParams(queryString);
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    }

    /**
     * Builds a query string from an object of parameters.
     * @param   {Object} params The object containing query parameters.
     * @returns {string}        The query string (without leading '?').
     * 
     * @example buildQueryString({foo: 'bar', baz: 'qux'}) 
     * // "foo=bar&baz=qux"
     * @global
     */
    function buildQueryString(params) {
        const searchParams = new URLSearchParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams.toString();
    }

    // #endregion

    // #region Storage Utilities

    /**
     * Sets a value in localStorage with automatic JSON serialization.
     * @param   {string} key   The key to store the value under.
     * @param   {*}      value The value to store (will be JSON stringified).
     * @returns {void}
     * 
     * @example setLocalStorage('user', {name: 'John'});
     * @global
     */
    function setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting localStorage:', error);
        }
    }

    /**
     * Gets a value from localStorage with automatic JSON parsing.
     * @param   {string} key      The key to retrieve.
     * @param   {*}      [fallback=null] The fallback value if the key doesn't exist or parsing fails.
     * @returns {*}               The parsed value from localStorage, or the fallback.
     * 
     * @example getLocalStorage('user') 
     * // {name: 'John'}
     * @global
     */
    function getLocalStorage(key, fallback = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (error) {
            console.error('Error getting localStorage:', error);
            return fallback;
        }
    }

    /**
     * Removes a value from localStorage.
     * @param   {string} key The key to remove.
     * @returns {void}
     * 
     * @example removeLocalStorage('user');
     * @global
     */
    function removeLocalStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing localStorage:', error);
        }
    }

    /**
     * Sets a value in sessionStorage with automatic JSON serialization.
     * @param   {string} key   The key to store the value under.
     * @param   {*}      value The value to store (will be JSON stringified).
     * @returns {void}
     * 
     * @example setSessionStorage('temp', {data: 'value'});
     * @global
     */
    function setSessionStorage(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting sessionStorage:', error);
        }
    }

    /**
     * Gets a value from sessionStorage with automatic JSON parsing.
     * @param   {string} key      The key to retrieve.
     * @param   {*}      [fallback=null] The fallback value if the key doesn't exist or parsing fails.
     * @returns {*}               The parsed value from sessionStorage, or the fallback.
     * 
     * @example getSessionStorage('temp') 
     * // {data: 'value'}
     * @global
     */
    function getSessionStorage(key, fallback = null) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (error) {
            console.error('Error getting sessionStorage:', error);
            return fallback;
        }
    }

    /**
     * Removes a value from sessionStorage.
     * @param   {string} key The key to remove.
     * @returns {void}
     * 
     * @example removeSessionStorage('temp');
     * @global
     */
    function removeSessionStorage(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing sessionStorage:', error);
        }
    }

    // #endregion

    // #region Array Helpers (Standalone + Prototype)

    // Polyfills / Extensions

    /**
     * Sum of array
     */
    if (!Array.prototype.sum) {
        Array.prototype.sum = function () { return sum(this); };
    }

    /**
     * Maximum number in the array.
     * Returns -Infinity for empty array
     */
    if (!Array.prototype.max) {
        Array.prototype.max = function () { return max(this); };
    }

    /**
     * Minimum number in the array.
     * Retuns Infinity for empty array.
     */
    if (!Array.prototype.min) {
        Array.prototype.min = function () { return min(this); };
    }

    /**
     * Groups items of array based on the passed function.
     * 
     * @example - [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
     */
    if (!Array.prototype.groupBy) {
        Array.prototype.groupBy = function (fn) { return groupBy(this, fn); };
    }

    // #endregion

    // Public API
    return {
        // DOM Manipulation
        createElement,
        openLink,
        downloadLink,
        ready,
        getQueryParams,
        buildQueryString,
        // File & MIME
        guessMimeType,
        downloadFileFromBytes,
        // API
        fetchRequest,
        // Cookies
        setCookie,
        getCookie,
        removeCookie,
        // Async
        toPromise,
        debounce,
        throttle,
        sleep,
        retry,
        timeout,
        // Strings
        capitalize,
        truncate,
        slugify,
        camelCase,
        snakeCase,
        kebabCase,
        escapeHtml,
        unescapeHtml,
        stripHtml,
        pad,
        // Numbers
        clamp,
        formatCurrency,
        randomInt,
        round,
        formatNumber,
        // Validation
        isValidEmail,
        isValidUrl,
        // Array Helpers
        sum,
        max,
        min,
        groupBy,
        unique,
        uniqueBy,
        chunk,
        flatten,
        flattenDeep,
        shuffle,
        partition,
        // Object Utilities
        deepClone,
        pick,
        omit,
        deepMerge,
        isEmpty,
        // Storage
        setLocalStorage,
        getLocalStorage,
        removeLocalStorage,
        setSessionStorage,
        getSessionStorage,
        removeSessionStorage
    };
}));