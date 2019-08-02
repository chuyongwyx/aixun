import http from '../utils/http'

//初始化新建数据
export const InitialAddDatas=()=>{
    return http("get","/apis/ReceivableAccountApplicationForm/InitialAddDatas")
}

//新建申请单
export const AddApplicationForm=(param)=>{
    return  http("post","/apis/api/ReceivableAccountApplicationForm/AddApplicationForm",param)
}

//获取设置完成的申请单
export const GetSettedApplicationForms=()=>{
    return http("get","/apis/api/ReceivableAccountApplicationForm/GetSettedApplicationForms")
}

