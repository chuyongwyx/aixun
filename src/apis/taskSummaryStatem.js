import http from '../utils/http';
//查询云支付收款账号跟进总表
export const GetApplicationForms =(param)=>{
    return http('post',"/apis/api/ReceivableAccountApplicationFormSummaryStatement/GetApplicationForms",param)
}

//云支付收款号跟进总表强制关闭
export const CloseApplicationForm =(param)=>{
    return  http("put","/apis/api/ReceivableAccountApplicationFormSummaryStatement/CloseApplicationForm",param)
} 