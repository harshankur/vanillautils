# Vanilla Utils
This is a zero-dependency collection of utility tools that will help development on vanilla-js a bit easier for you.
I have always appreciated the no-framework idea for most small projects which do not require a lot of maintenance.
And these are the sets of tools that I have always had in my projects in some way or form. I have compiled them here with improvements such that they are helpful in a more macroscopic level.
I will keep updating it with more tools.

Access it by using this library.
Or you can use it in your frontend code like this
```html
<script src="https://mirror.harshankur.com/vanillaUtils.min.js" crossorigin="anonymous"><script>
```

Below is the documentation for this project.
## Functions

<dl>
<dt><a href="#createElement">createElement(tagName, [attributes])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Creates an element with a given attribute map in the argument for a given tagName.</p>
</dd>
<dt><a href="#openLink">openLink(url, [newTab])</a> ⇒ <code>void</code></dt>
<dd><p>Opens the link provided in the argument &#39;url&#39;. Based on the other argument &#39;newTab&#39;, it either opens it in the same tab or in a new tab.
NOTE: In the case of trying to open this url in a new tab, the browser might first ask the user to enable popups for this website instead of directly opening the link.</p>
</dd>
<dt><a href="#downloadLink">downloadLink(url)</a> ⇒ <code>void</code></dt>
<dd><p>Downloads the content of the url passed in the argument.
NOTE: You can only trigger download of a url which is in the same domain as the current one.
There is Cross-Site access for downloads.
If you pass a url from another domain, the browser usually just opens the file on the same tab which might result in loss of unsaved data in the current page.</p>
</dd>
<dt><a href="#guessMimeType">guessMimeType(bytes)</a> ⇒ <code>string</code></dt>
<dd><p>Guess the MIME type based on the initial bytes of a file.</p>
</dd>
<dt><a href="#downloadFileFromBytes">downloadFileFromBytes(bytes, name, [type])</a> ⇒ <code>void</code></dt>
<dd><p>Saves the content of the byteArray passed in the argument with its filename passed in the argument.</p>
</dd>
<dt><a href="#fetchRequest">fetchRequest(url, [config])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Fetch handler for a request with body.</p>
</dd>
<dt><a href="#setCookie">setCookie(key, value, [config])</a> ⇒ <code>void</code></dt>
<dd><p>Sets cookie on the browser for the given key and value for the given duration</p>
</dd>
<dt><a href="#getCookie">getCookie(key)</a> ⇒ <code>string</code></dt>
<dd><p>Fetches cookie value for a given key.</p>
</dd>
<dt><a href="#removeCookie">removeCookie(key)</a> ⇒ <code>void</code></dt>
<dd><p>Remove cookie for a given key.</p>
</dd>
<dt><a href="#toPromise">toPromise(fn, args)</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>This takes a function and returns a promisied version of it.
Basically it resolves after this fn is executed.
It is helpful primarily when one is switching over multiple cases and some of them do not return a promise but it is easier to handle all the cases in promises.</p>
</dd>
<dt><a href="#debounce">debounce(fn, t)</a> ⇒ <code>function</code></dt>
<dd><p>Debounces a function, i.e., ignored repeated calls for a function. It rather takes the last call while it is waiting.</p>
</dd>
<dt><a href="#capitalize">capitalize(str)</a> ⇒ <code>string</code></dt>
<dd><p>Capitalizes the first letter of a string.</p>
</dd>
<dt><a href="#truncate">truncate(str, length)</a> ⇒ <code>string</code></dt>
<dd><p>Truncates a string to a specified length and adds an ellipsis (...) if it exceeds that length.</p>
</dd>
<dt><a href="#slugify">slugify(str)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a string into a URL-friendly slug.
Converts to lowercase, removes non-word characters, and replaces spaces with dashes.</p>
</dd>
<dt><a href="#clamp">clamp(num, min, max)</a> ⇒ <code>number</code></dt>
<dd><p>Clamps a number between a minimum and maximum value.</p>
</dd>
<dt><a href="#formatCurrency">formatCurrency(amount, [currency], [locale])</a> ⇒ <code>string</code></dt>
<dd><p>Formats a number as a currency string.</p>
</dd>
<dt><a href="#isValidEmail">isValidEmail(email)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a string is a valid email address.
Uses a simple regex for basic validation.</p>
</dd>
<dt><a href="#isValidUrl">isValidUrl(url)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a string is a valid URL.</p>
</dd>
<dt><a href="#sum">sum(arr)</a> ⇒ <code>number</code></dt>
<dd><p>Calculates the sum of an array of numbers.</p>
</dd>
<dt><a href="#max">max(arr)</a> ⇒ <code>number</code></dt>
<dd><p>Finds the maximum number in an array.</p>
</dd>
<dt><a href="#min">min(arr)</a> ⇒ <code>number</code></dt>
<dd><p>Finds the minimum number in an array.</p>
</dd>
<dt><a href="#groupBy">groupBy(arr, fn)</a> ⇒ <code>object</code></dt>
<dd><p>Groups items of an array based on a key returned by a callback function.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FetchConfig">FetchConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CookieConfig">CookieConfig</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="createElement"></a>

## createElement(tagName, [attributes]) ⇒ <code>HTMLElement</code>
Creates an element with a given attribute map in the argument for a given tagName.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tagName | <code>string</code> |  | A tag name for this new element to be created. |
| [attributes] | <code>Object.&lt;string, any&gt;</code> | <code>{}</code> | We will use this object's keys as attributes for the element and its values as the attribute values. |

**Example**  
```js
const attributes = {
    class: 'class1 class2',
    id: 'id1',
    style: '{ display: "flex"; }',
    'data-region': 'Germany'
};
const element = createElement('div', attributes);
// <div class="class1 class2" id="id1" style="{ display: "flex"; }" data-region="Germany"></div>
```
**Example**  
```js
const attributes = {
    href: 'https://blog.harshankur.com',
    target: '_blank'
};
const element = createElement('a', attributes);
// <a href="https://blog.harshankur.com" target="_blank"></a>
```
<a name="openLink"></a>

## openLink(url, [newTab]) ⇒ <code>void</code>
Opens the link provided in the argument 'url'. Based on the other argument 'newTab', it either opens it in the same tab or in a new tab.
NOTE: In the case of trying to open this url in a new tab, the browser might first ask the user to enable popups for this website instead of directly opening the link.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The url that you want to open on the client's browser. |
| [newTab] | <code>boolean</code> | <code>false</code> | Flag whether to open this url in a new tab. Please note that passing this true might get the new link (popup) blocked depending on the browser settings. |

**Example**  
```js
openLink("https://github.com/harshankur", true);
```
<a name="downloadLink"></a>

## downloadLink(url) ⇒ <code>void</code>
Downloads the content of the url passed in the argument.
NOTE: You can only trigger download of a url which is in the same domain as the current one.
There is Cross-Site access for downloads.
If you pass a url from another domain, the browser usually just opens the file on the same tab which might result in loss of unsaved data in the current page.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url from which you wish to trigger a content download. |

**Example**  
```js
downloadLink("https://mirror.harshankur.com/vanillaUtils.min.js");
```
<a name="guessMimeType"></a>

## guessMimeType(bytes) ⇒ <code>string</code>
Guess the MIME type based on the initial bytes of a file.

**Kind**: global function  
**Returns**: <code>string</code> - The guessed MIME type or 'application/octet-stream' if unknown.  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | The byte array representing the file content. |


* [guessMimeType(bytes)](#guessMimeType) ⇒ <code>string</code>
    * [~signatures](#guessMimeType..signatures) : <code>Object.&lt;string, string&gt;</code>
    * [~getHexString(byteArray)](#guessMimeType..getHexString) ⇒ <code>string</code>

<a name="guessMimeType..signatures"></a>

### guessMimeType~signatures : <code>Object.&lt;string, string&gt;</code>
Known file signatures mapped to their corresponding MIME types.

**Kind**: inner constant of [<code>guessMimeType</code>](#guessMimeType)  
<a name="guessMimeType..getHexString"></a>

### guessMimeType~getHexString(byteArray) ⇒ <code>string</code>
Converts a byte array to a hexadecimal string.

**Kind**: inner method of [<code>guessMimeType</code>](#guessMimeType)  
**Returns**: <code>string</code> - The hexadecimal string representation of the byte array.  

| Param | Type | Description |
| --- | --- | --- |
| byteArray | <code>Uint8Array</code> | The byte array to convert. |

<a name="downloadFileFromBytes"></a>

## downloadFileFromBytes(bytes, name, [type]) ⇒ <code>void</code>
Saves the content of the byteArray passed in the argument with its filename passed in the argument.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | File bytes. |
| name | <code>string</code> | The name of the file in the download |
| [type] | <code>string</code> | File Mimetype |

**Example**  
```js
downloadFileFromBytes(<bytes>, 'myFile.pdf');
```
<a name="fetchRequest"></a>

## fetchRequest(url, [config]) ⇒ <code>Promise.&lt;any&gt;</code>
Fetch handler for a request with body.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - Returns a Promise for the fetch request.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | Url to make this fetch request. |
| [config] | [<code>FetchConfig</code>](#FetchConfig) | <code>{}</code> | Config for this fetch request. |

**Example**  
```js
fetchRequest('https://mirror.harshankur.com/vanillaUtils.min.js')
// GET https://mirror.harshankur.com/vanillaUtils.min.js
```
**Example**  
```js
const params = {
    method: 'POST',
    header: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: "Harsh Ankur" })
};
fetchRequest('https://post-example.com/registerName', params);
// POST https://post-example.com/registerName -H "Content-Type: application/json" -d '{ "name": "Harsh Ankur" }'
```
<a name="setCookie"></a>

## setCookie(key, value, [config]) ⇒ <code>void</code>
Sets cookie on the browser for the given key and value for the given duration

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | Key of the cookie |
| value | <code>string</code> |  | Value to be set for this cookie |
| [config] | [<code>CookieConfig</code>](#CookieConfig) | <code>{}</code> | [OPTIONAL] Configuration for settings cookies |

**Example**  
```js
setCookie("key1", "value1");
// Setting session specific cookie for key1: value1
```
**Example**  
```js
setCookie("key2", "value2", { expires: 30, path: '/' });
// Setting key2: value2 cookie on the root domain that expires in 30 days.
```
<a name="getCookie"></a>

## getCookie(key) ⇒ <code>string</code>
Fetches cookie value for a given key.

**Kind**: global function  
**Returns**: <code>string</code> - Value of the cookie for the corresponding key.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the cookie. |

**Example**  
```js
const storedValue = getCookie("key1");
// "value1"
```
**Example**  
```js
const storedValue = getCookie("key2");
// "value2"
```
<a name="removeCookie"></a>

## removeCookie(key) ⇒ <code>void</code>
Remove cookie for a given key.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the cookie |

**Example**  
```js
getCookie("key1");
// "value1"
removeCookie("key1");
getCookie("key1");
// ""
```
<a name="toPromise"></a>

## toPromise(fn, args) ⇒ <code>Promise.&lt;any&gt;</code>
This takes a function and returns a promisied version of it.
Basically it resolves after this fn is executed.
It is helpful primarily when one is switching over multiple cases and some of them do not return a promise but it is easier to handle all the cases in promises.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise that will be resolved once the fn function is executed.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function that is needed to be promisied. |
| args | <code>Array.&lt;any&gt;</code> | Array of arguments to be called for this function. |

<a name="debounce"></a>

## debounce(fn, t) ⇒ <code>function</code>
Debounces a function, i.e., ignored repeated calls for a function. It rather takes the last call while it is waiting.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function needed to debounce |
| t | <code>number</code> | milliseconds delay for debouncing. |

<a name="capitalize"></a>

## capitalize(str) ⇒ <code>string</code>
Capitalizes the first letter of a string.

**Kind**: global function  
**Returns**: <code>string</code> - The string with its first character converted to uppercase.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to capitalize. |

**Example**  
```js
capitalize("hello world") 
// "Hello world"
```
<a name="truncate"></a>

## truncate(str, length) ⇒ <code>string</code>
Truncates a string to a specified length and adds an ellipsis (...) if it exceeds that length.

**Kind**: global function  
**Returns**: <code>string</code> - The truncated string with '...' appended if truncated.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to truncate. |
| length | <code>number</code> | The maximum length of the string before truncation. |

**Example**  
```js
truncate("Hello World", 5) 
// "Hello..."
```
<a name="slugify"></a>

## slugify(str) ⇒ <code>string</code>
Converts a string into a URL-friendly slug.
Converts to lowercase, removes non-word characters, and replaces spaces with dashes.

**Kind**: global function  
**Returns**: <code>string</code> - The clean, slugified string.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to slugify. |

**Example**  
```js
slugify("Hello World!") 
// "hello-world"
```
<a name="clamp"></a>

## clamp(num, min, max) ⇒ <code>number</code>
Clamps a number between a minimum and maximum value.

**Kind**: global function  
**Returns**: <code>number</code> - The clamped value.  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | The number to clamp. |
| min | <code>number</code> | The minimum allowed value. |
| max | <code>number</code> | The maximum allowed value. |

**Example**  
```js
clamp(100, 0, 50) 
// 50
```
<a name="formatCurrency"></a>

## formatCurrency(amount, [currency], [locale]) ⇒ <code>string</code>
Formats a number as a currency string.

**Kind**: global function  
**Returns**: <code>string</code> - The formatted currency string.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| amount | <code>number</code> |  | The number to format. |
| [currency] | <code>string</code> | <code>&quot;&#x27;USD&#x27;&quot;</code> | The currency code (e.g., 'USD', 'EUR'). |
| [locale] | <code>string</code> | <code>&quot;&#x27;en-US&#x27;&quot;</code> | The locale string (e.g., 'en-US', 'de-DE'). |

**Example**  
```js
formatCurrency(1234.56) 
// "$1,234.56"
```
<a name="isValidEmail"></a>

## isValidEmail(email) ⇒ <code>boolean</code>
Checks if a string is a valid email address.
Uses a simple regex for basic validation.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if valid, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | The email string to check. |

**Example**  
```js
isValidEmail("test@example.com") 
// true
```
<a name="isValidUrl"></a>

## isValidUrl(url) ⇒ <code>boolean</code>
Checks if a string is a valid URL.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if valid, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL string to check. |

**Example**  
```js
isValidUrl("https://google.com") 
// true
```
<a name="sum"></a>

## sum(arr) ⇒ <code>number</code>
Calculates the sum of an array of numbers.

**Kind**: global function  
**Returns**: <code>number</code> - The total sum.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;number&gt;</code> | The array of numbers to sum. |

**Example**  
```js
sum([1, 2, 3]) 
// 6
```
<a name="max"></a>

## max(arr) ⇒ <code>number</code>
Finds the maximum number in an array.

**Kind**: global function  
**Returns**: <code>number</code> - The maximum value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;number&gt;</code> | The array to search. |

**Example**  
```js
max([1, 5, 2]) 
// 5
```
<a name="min"></a>

## min(arr) ⇒ <code>number</code>
Finds the minimum number in an array.

**Kind**: global function  
**Returns**: <code>number</code> - The minimum value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;number&gt;</code> | The array to search. |

**Example**  
```js
min([1, 5, 2]) 
// 1
```
<a name="groupBy"></a>

## groupBy(arr, fn) ⇒ <code>object</code>
Groups items of an array based on a key returned by a callback function.

**Kind**: global function  
**Returns**: <code>object</code> - An object where keys are the groups and values are arrays of items.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array to group. |
| fn | <code>function</code> | The callback function that returns the key to group by. |

**Example**  
```js
groupBy([1.1, 1.2, 2.1], Math.floor) 
// { '1': [1.1, 1.2], '2': [2.1] }
```
<a name="FetchConfig"></a>

## FetchConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [method] | <code>&#x27;DELETE&#x27;</code> \| <code>&#x27;GET&#x27;</code> \| <code>&#x27;POST&#x27;</code> \| <code>&#x27;PUT&#x27;</code> | Method of the fetch call. Default is **'GET'**. |
| [mode] | <code>&#x27;no-cors&#x27;</code> \| <code>&#x27;cors&#x27;</code> \| <code>&#x27;navigate&#x27;</code> \| <code>&#x27;websocket&#x27;</code> \| <code>&#x27;same-origin&#x27;</code> | Cross-Origin Mode. Default is **'cors'** if the fetch is created using Request constructor. Otherwise it is **'no-cors'**. |
| [cache] | <code>&#x27;default&#x27;</code> \| <code>&#x27;no-cache&#x27;</code> \| <code>&#x27;reload&#x27;</code> \| <code>&#x27;force-cache&#x27;</code> \| <code>&#x27;only-if-cached&#x27;</code> | Cache Policy. Default is **'default'**. |
| [credentials] | <code>&#x27;include&#x27;</code> \| <code>&#x27;same-origin&#x27;</code> \| <code>&#x27;omit&#x27;</code> | Credentials Policy. Default is **'same-origin'**. |
| [redirect] | <code>&#x27;manual&#x27;</code> \| <code>&#x27;follow&#x27;</code> \| <code>&#x27;error&#x27;</code> | Redirect Policy. Default is **'follow'**. |
| [referrerPolicy] | <code>&#x27;no-referrer&#x27;</code> \| <code>&#x27;no-referrer-when-downgrade&#x27;</code> \| <code>&#x27;origin&#x27;</code> \| <code>&#x27;origin-when-cross-origin&#x27;</code> \| <code>&#x27;same-origin&#x27;</code> \| <code>&#x27;strict-origin&#x27;</code> \| <code>&#x27;strict-origin-when-cross-origin&#x27;</code> \| <code>&#x27;unsafe-url&#x27;</code> | Refferer Policy. Default is **'no-referrer-when-downgrade'**. |
| [headers] | <code>object</code> | Header for this fetch request. Default is an empty object. |
| [body] | <code>object</code> \| <code>string</code> | Body for this fetch request. Body data type must match "Content-Type" header. |

<a name="CookieConfig"></a>

## CookieConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [expires] | <code>number</code> | Number of DAYS after which this cookie will be expired. If not specified, it would mean that the cookie is session-specific. |
| [path] | <code>string</code> | Indicates the path that must exist in the requested URL for the browser to send the Cookie header (e.g., '/', '/mydir'). If not specified, it defaults to the current path of the current document location. |
| [samesite] | <code>string</code> | Prevents the browser from sending this cookie along with cross-site requests. Possible values are lax, strict or none. Strict prevents from sending to cross-site requests. Lax allows a few basic cross-site requests but prevents many Cross-Site Requesst Forgery attacks. Default is None which implies no restriction. |
| [secure] | <code>boolean</code> | Specifies that the cookie should only be transmitted over a secure protocol. Default is **true** which would mean that this cookie will be sent over only in secure communications. |

