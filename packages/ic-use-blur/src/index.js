/**
 * @name: ic-use-blur ;
 * @author: admin ;
 * @description: 在复合表单组件中控制blur事件的触发 ;
 * */

import {useEffect, useRef, useState} from 'react'

export default (onBlur, dom) => {
    const outerRef = useRef();
    const [focus, setFocus] = useState(false);

    const outerClickHandler = (e) => {
        if (!outerRef.current.contains(e.target)) {
            if (focus && onBlur) {
                setFocus(false);
                onBlur(e);
            }
        }
    };

    const handlerFocus = () => {
        setFocus(true);
    };

    useEffect(() => {
        const eventDom = dom || document.body;
        eventDom.addEventListener('click', outerClickHandler);
        outerRef.current.addEventListener('focus', handlerFocus, true);
        return () => {
            outerRef.current.removeEventListener('focus', handlerFocus, true);
            eventDom.removeEventListener('click', outerClickHandler);
        }
    });
    return outerRef;
};
