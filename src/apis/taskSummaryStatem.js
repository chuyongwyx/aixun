import http from '../utils/http';
//查询云支付收款账号跟进总表
export const GetApplicationForms =(param)=>{
    return http('post',"http://is-test.aserweb.com:50102/api/ReceivableAccountApplicationFormSummaryStatement/GetApplicationForms",param)
}

//云支付收款号跟进总表强制关闭
export const CloseApplicationForm =(param)=>{
    return  http("put","http://is-test.aserweb.com:50102/api/ReceivableAccountApplicationFormSummaryStatement/CloseApplicationForm",param)
} 