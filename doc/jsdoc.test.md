## Functions

<dl>
<dt><a href="#createElement">createElement(tagName, [attributes])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Creates an element with a given attribute map in the argument for a given tagName.</p>
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

