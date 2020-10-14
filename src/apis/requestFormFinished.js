import http from '../utils/http';
//获取申请单
export const getRequestForms =(params)=>{
    return http("post","http://is-test.aserweb.com:50102/api/CloudApplicationForm/GetApplicationForms",params)
}
// 受理申请单
export const acceptCloudApplicationForm =(param)=>{
    return http("put","http://is-test.aserweb.com:50102/api/CloudApplicationForm/AcceptApplicationForm",param)
}

//取消受理申请单
export const cancelAcceptCloudApplicationForm =(param)=>{
    return http("put","http://is-test.aserweb.com:50102/api/CloudApplicationForm/CancelAcceptApplicationForm",param)
}
//完成申请单
export const  FinishCloudApplicationForm =(param)=>{
    return http("put","http://is-test.aserweb.com:50102/api/CloudApplicationForm/FinishApplicationForm",param)
}

//获取引用的申请单（品牌认证和申请云支付账号）
export const GetRefferenceApplicationForms=(param)=>{
    return http("post","http://is-test.aserweb.com:50102/api/CloudApplicationForm/GetRefferenceApplicationForms",param)
}

//根据项目编号获取项目情况
export const GetProjectSituationByNumber=(param)=>{
    return http("get","http://is-test.aserweb.com:50102/api/CloudApplicationForm/GetProjectSituationByNumber/?Number="+param)
}