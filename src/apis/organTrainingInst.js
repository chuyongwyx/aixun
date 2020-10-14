import http from "../utils/http"
//获取设置完成的申请单
export const GetSettedApplicationForms=()=>{
    return http("get","http://is-test.aserweb.com:50102/api/ReceivableAccountApplicationForm/GetSettedApplicationForms")
}
// 培训机构信息
export  const InitialArrangeTrainingInstitutionDatas=()=>{
    return http("get","http://is-test.aserweb.com:50102/api/ReceivableAccountApplicationForm/InitialArrangeTrainingInstitutionDatas")
}
//安排培训机构
export const ArrangeTrainingInstitution=(param)=>{
   
    return http("put","http://is-test.aserweb.com:50102/api/ReceivableAccountApplicationForm/ArrangeTrainingInstitution",param)
}  