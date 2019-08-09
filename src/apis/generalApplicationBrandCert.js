import http from '../utils/http';
//查询品牌认证申请跟进总表
export const GetApplicationForms =(param)=>{
    return http("post","/apis/api/BrandCertificationApplicationFormSummaryStatement/GetApplicationForms",param)
}

//查看认证资料
export const GetApplicationFormByID =(param)=>{
    return http("get","/apis/api/BrandCertificationApplicationFormSummaryStatement/GetApplicationFormByID/?id="+param);
}

//强制关闭申请品牌认证申请单
export const CloseApplicationForm=(param)=>{
    return http("put","/apis/api/BrandCertificationApplicationFormSummaryStatement/CloseApplicationForm",param);
}