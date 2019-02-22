/**
 * @name: ic-beacon ;
 * @author: linzp ;
 * @description: 代码统计代码 ;
 * */

window._czc = window._czc || [];

export function setView (content_url, referer_url) {
    _czc.push(["_trackPageview", content_url, referer_url]);
};

export function setEvent(...args) {
    _czc.push(["_trackEvent", ...args]);
};
