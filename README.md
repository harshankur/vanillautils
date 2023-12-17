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
openLink("https://github.com/harshankur");
```
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

