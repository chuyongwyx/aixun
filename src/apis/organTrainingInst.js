import http from "../utils/http"
//初始化安排培训机构
export  const InitialArrangeTrainingInstitutionDatas=()=>{
    return http("get","/apis/api/ReceivableAccountApplicationForm/InitialArrangeTrainingInstitutionDatas")
}
//安排培训机构
export const ArrangeTrainingInstitution=(param)=>{
   
    return http("put","/apis/api/ReceivableAccountApplicationForm/ArrangeTrainingInstitution",param)
}