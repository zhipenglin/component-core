import React,{PureComponent} from 'react'
import {setView} from './index'

export default (WrappedComponent)=>{
    return class extends PureComponent{
        componentWillReceiveProps({location,prevRouter}){
            const {pathname,search}=location;
            let referer_url,content_url=pathname+search;
            if(prevRouter){
                referer_url=prevRouter.location.pathname+prevRouter.location.search;
            }
            if(referer_url===content_url) return;
            setView(content_url,referer_url);
        }
        render(){
            return <WrappedComponent {...this.props}/>;
        }
    }
};