import http from '../utils/http';
//初始化新建数据获取项目信息
export const InitialAddDatas=()=>{
    return http("get","/apis/api/CloudApplicationForm/InitialAddDatas")
}

//新建申请单
export const newRequestForm =(params)=>{
    return http("post","/apis/api/CloudApplicationForm/AddApplicationForm",params)
}



