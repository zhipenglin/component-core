/**
 * @name: ic-use-click-outside ;
 * @author: admin ;
 * @description: 响应点击空白事件 ;
 * */

import {useEffect, useRef} from 'react'

export default (onClickOutside, dom) => {
    const outerRef = useRef();

    const outerClickHandler = (e) => {
        if (!outerRef.current.contains(e.target)) {
            onClickOutside && onClickOutside(e);
        }
    };

    useEffect(() => {
        const eventDom = dom || document.body;
        eventDom.addEventListener('click', outerClickHandler);
        return () => {
            eventDom.removeEventListener('click', outerClickHandler);
        }
    });
    return outerRef;
};