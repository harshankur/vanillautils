/***********************************************************************************************
 *                                       VANILLAUTILS.JS                                       *
 * A COLLECTION OF UTILITY FUNCTIONS THAT CAN BE USED IN DEVELOPMENT OF ANY FRONTEND PROJECTS. *
 *                                     AUTHOR: HARSH ANKUR                                     *
 ***********************************************************************************************/
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
 * @returns {void}
 */
export function setCookie(key: string, value: string, config?: CookieConfig): void;
/**
 * Fetches cookie value for a given key.
 * @param   {string} key Key of the cookie
 * @returns {string} Value of the cookie for the corresponding
 */
export function getCookie(key: string): string;
/**
 * Remove cookie for a given key.
 * @param   {string} key Key of the cookie
 * @returns {void}
 */
export function removeCookie(key: string): void;
export type CookieConfig = {
    /**
     * Number of DAYS after which this cookie will be expired. If not specified, it would mean that the cookie is session-specific.
     */
    expires?: number;
    /**
     * Indicates the path that must exist in the requested URL for the browser to send the Cookie header (e.g., '/', '/mydir'). If not specified, it defaults to the current path of the current document location.
     */
    path?: string;
    /**
     * Prevents the browser from sending this cookie along with cross-site requests. Possible values are lax, strict or none. Strict prevents from sending to cross-site requests. Lax allows a few basic cross-site requests but prevents many Cross-Site Requesst Forgery attacks. Default is None which implies no restriction.
     */
    samesite?: string;
    /**
     * Specifies that the cookie should only be transmitted over a secure protocol. Default is true which would mean that this cookie will be sent over only in secure communications.
     */
    secure?: boolean;
};
//# sourceMappingURL=vanillaUtils.d.ts.map