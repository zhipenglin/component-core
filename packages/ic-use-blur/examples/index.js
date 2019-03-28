import React from 'react'
import useBlur from '@core/ic-use-blur'
const CustomComponent=({onBlur})=>{
    const outerRef=useBlur(onBlur);
    return <div ref={outerRef}><input/><input/></div>
};