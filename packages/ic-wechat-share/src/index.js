/**
 * @name: ic-wechat-share ;
 * @author: admin ;
 * @description: 微信分享sdk ;
 * */

const matched = window.navigator.userAgent.match(/MicroMessenger\/([\d|\.]+)/),
    isWechat = matched && matched.length > 1, isAndroid = /Android (\d+\.\d+(\.\d+)?)/i;

const isNormalVersion=(()=>{
    if(isWechat){
        [major,minor]=matched[1].split('.');
        //if(major>6||){}
    }
})();

export default function () {

}
