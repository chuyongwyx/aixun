import http from '../utils/http'

//初始化新建数据
export const InitialAddDatas=()=>{
    return http("get","http://is-test.aserweb.com:50102/api/ReceivableAccountApplicationForm/InitialAddDatas")
}

//根据项目编号获取品牌
export const GetBrandByProjectNumber =(param)=>{
    return http("get","http://is-test.aserweb.com:50102/api/ReceivableAccountApplicationForm/GetBrandByProjectNumber/?projectNumber="+param)
}

//新建申请单
export const AddApplicationForm=(param)=>{
    return  http("post","http://is-test.aserweb.com:50102/api/ReceivableAccountApplicationForm/AddApplicationForm",param)
    
}

//获取设置完成的申请单
// export const GetSettedApplicationForms=()=>{
//     return http("get","/apis/api/ReceivableAccountApplicationForm/GetSettedApplicationForms")
// }

  