export default (event)=>{
    return event instanceof window.Event||event.nativeEvent instanceof window.Event;
};
