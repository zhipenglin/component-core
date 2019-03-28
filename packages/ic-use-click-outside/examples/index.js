import React from 'react'
import useClickOutside from '@core/ic-use-click-outside'
const CustomComponent=({onClickOutside})=>{
    const outerRef=useClickOutside(onClickOutside);
    return <div ref={outerRef}>XXXXXX</div>
};