import http from '../utils/http';

// 云支付主菜单获取未读消息
export const  payItemMessage =()=>{
     return http('get',"http://is-test.aserweb.com:50102/api/MMCloudPay/GetMessages");
}