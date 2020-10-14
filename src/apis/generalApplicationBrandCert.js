import http from '../utils/http';
//查询品牌认证申请跟进总表
export const GetApplicationForms =(param)=>{
    return http("post","http://is-test.aserweb.com:50102/api/BrandCertificationApplicationFormSummaryStatement/GetApplicationForms",param)
}

//查看认证资料
export const GetApplicationFormByID =(param)=>{
    return http("get","http://is-test.aserweb.com:50102/api/BrandCertificationApplicationFormSummaryStatement/GetApplicationFormByID/?id="+param);
}

//强制关闭申请品牌认证申请单
export const CloseApplicationForm=(param)=>{
    return http("put","http://is-test.aserweb.com:50102/api/BrandCertificationApplicationFormSummaryStatement/CloseApplicationForm",param);
}