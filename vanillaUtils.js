/***********************************************************************************************
 *                                       VANILLAUTILS.JS                                       *
 * A COLLECTION OF UTILITY FUNCTIONS THAT CAN BE USED IN DEVELOPMENT OF ANY FRONTEND PROJECTS. *
 *                                     AUTHOR: HARSH ANKUR                                     *
 ***********************************************************************************************/


// #region DOM Manipulation


/**
 * Creates an element with a given attribute map in the argument for a given tagName.
 * @param   {string}               tagName         A tag name for this new element to be created.
 * @param   {{[key: string]: any}} [attributes={}] We will use this object's keys as attributes for the element and its values as the attribute values.
 * 
 * @returns {HTMLElement}
 * 
 * @example const element = createElement('div',
 *                                          {
 *                                              class: 'class1 class2',
 *                                              id: 'id1',
 *                                              style: '{ display: "flex"; }',
 *                                              'data-region': 'Germany'
 *                                          });
 * // <div class="class1 class2" id="id1" style="{ display: "flex"; }" data-region="Germany"></div>
 * @example const element = createElement('a',
 *                                          {
 *                                              href: 'https://blog.harshankur.com',
 *                                              target: '_blank'
 *                                          });
 * // <a href="https://blog.harshankur.com" target="_blank"></a>
 */
export function createElement(tagName, attributes = {}) {
    // Create element
    const element = document.createElement(tagName);
    // Add all the attributes.
    for (let key in attributes)
    {
        if (!attributes.hasOwnProperty(key))
            continue;
        element.setAttribute(key, attributes[key]);
    }
    return element;
}


// #endregion

// #region API Request Manager


/** @typedef {Object} FetchConfig
 * @property {'DELETE'
 *            | 'GET'
 *            | 'POST'
 *            | 'PUT'}                             method         Method of the fetch call. Could be 'GET', 'POST', 'PUT' or 'DELETE'. Default is 'GET'.
 * @property {'no-cors'
 *            | 'cors'
 *            | 'same-origin'}                     mode           Cross-Origin Mode. Could be 'no-cors', 'cors' or 'same-origin'. Default is 'cors'.
 * @property {'default'
 *            | 'no-cache'
 *            | 'reload'
 *            | 'force-cache'
 *            | 'only-if-cached'}                  cache          Cache Policy. Could be 'default', 'no-cache', 'reload', 'force-cache' or 'only-if-cached'. Default is 'default'.
 * @property {'include'
 *            | 'same-origin'
 *            | 'omit'}                            credentials    Credentials Policy. Could be 'include', 'same-origin' or 'omit'. Default is 'same-origin'.
 * @property {'manual'
 *            | 'follow'
 *            | 'error'}                           redirect       Redirect Policy. Could be 'manual', 'follow' or 'error'. Default is 'follow'.
 * @property {'no-referrer'
 *             | 'no-referrer-when-downgrade'
 *             | 'origin'
 *             | 'origin-when-cross-origin'
 *             | 'same-origin'
 *             | 'strict-origin'
 *             | 'strict-origin-when-cross-origin'
 *             | 'unsafe-url'}                     referrerPolicy Refferer Policy. Could be 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin' or 'unsafe-url'. Default is 'no-referrer-when-downgrade'.
 * @property {object}                              headers        Header for this fetch request. Default is an empty object.
 * @property {object | string}                     body           Body for this fetch request. Body data type must match "Content-Type" header.
 */

/**
 * Fetch handler for a request with body.
 * @param   {string}      url         Url to make this fetch request.
 * @param   {FetchConfig} [config={}] Config for this fetch request.
 * 
 * @returns {Promise<any>}            Returns a Promise for the fetch request.
 * 
 * @example fetchRequest('https://mirror.harshankur.com/vanillaUtils.min.js')
 * // GET https://mirror.harshankur.com/vanillaUtils.min.js
 * @example fetchRequest('https://post-example.com/registerName',
 *                          {
 *                              method: 'POST',
 *                              header: {
 *                                  'Content-Type': 'application/json'
 *                              },
 *                              body: JSON.stringify({ name: "Harsh Ankur" })
 *                          })
 * // POST https://post-example.com/registerName -H "Content-Type: application/json" -d '{ "name": "Harsh Ankur" }'
 */
export function fetchRequest(url, config = {}) {
    // Validation
    if (url == undefined)
        return Promise.reject("Improper request. Needs a url.");

    // Local Config Object.
    const internalConfig  = {...config};
    internalConfig.method = internalConfig.method ?? 'GET';

    // Execute fetch call and return promise.
    return fetch(url, internalConfig)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            });
}


// #endregion

// #region Cookies


/** @typedef {Object} CookieConfig
 * @property {number}  [expires]  Number of DAYS after which this cookie will be expired. If not specified, it would mean that the cookie is session-specific.
 * @property {string}  [path]     Indicates the path that must exist in the requested URL for the browser to send the Cookie header (e.g., '/', '/mydir'). If not specified, it defaults to the current path of the current document location.
 * @property {string}  [samesite] Prevents the browser from sending this cookie along with cross-site requests. Possible values are lax, strict or none. Strict prevents from sending to cross-site requests. Lax allows a few basic cross-site requests but prevents many Cross-Site Requesst Forgery attacks. Default is None which implies no restriction.
 * @property {boolean} [secure]   Specifies that the cookie should only be transmitted over a secure protocol. Default is true which would mean that this cookie will be sent over only in secure communications.
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
 */
export function setCookie(key, value, config = {}) {
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
 */
export function getCookie(key) {
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
 */
export function removeCookie(key) {
    // Set cookie expiry to the current time so it expires immediately after.
    document.cookie = `${key}=;expires=${(new Date()).toGMTString()}`;
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
 */
export function toPromise(fn, args) {
    return new Promise((res, _) => { res(fn(...args)) });
}


// #endregion

module.exports.fetchRequest    = fetchRequest;
module.exports.setCookie       = setCookie;
module.exports.getCookieCookie = setCookie;
module.exports.removeCookie    = setCookie;
module.exports.toPromise       = toPromise;