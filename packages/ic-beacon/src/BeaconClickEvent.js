import React,{PureComponent} from 'react'
import {setEvent} from './index'

export default class BeaconEvent extends PureComponent{
    static defaultProps={
        type:'span'
    };
    handlerCLick=(e)=>{
        const {event,onClick}=this.props;
        onClick&&onClick(e);
        setEvent(event,'click');
    };
    render(){
        const {type,event,children,...args}=this.props;
        return React.createElement(type,{...args,onClick:this.handlerCLick},children);
    }
}
