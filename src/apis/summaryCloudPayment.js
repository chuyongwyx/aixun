import http from '../utils/http';
//查询云支付申请跟进总表
export const GetApplicationForms =(param)=>{
    return  http("post","/apis/api/CloudApplicationFormSummaryStatement/GetApplicationForms",param);
}

//获取引用的申请单
export const GetRefferenceApplicationForms=(param)=>{
    return http("post","/apis/api/CloudApplicationFormSummaryStatement/GetRefferenceApplicationForms",param);
}

//修改备注
export const ModifyRemark=(param)=>{
    return http("put","/apis/api/CloudApplicationFormSummaryStatement/ModifyRemark",param);
} 
//强制关闭
export const CloseApplicationForm=(param)=>{
    return http("put","/apis/api/CloudApplicationFormSummaryStatement/CloseApplicationForm",param);
} 