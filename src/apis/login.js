import http from '../utils/http';

//获取二维码
export const userLoginWxEr = (param)=>{
    return http("get","/apis/api/Account/GetLoginQRCode");
}
