import http from '../utils/http';

//获取二维码
export const userLoginWxEr = (param)=>{
    return http("get","http://is-test.aserweb.com:50102/api/Account/GetLoginQRCode");
}
//修改密码
export const ModifyPassword=(param)=>{
    return http("put","http://is-test.aserweb.com:50102/api/ApplicationMenu/ModifyPassword",param) 
 }