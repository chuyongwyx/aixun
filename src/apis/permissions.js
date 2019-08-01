// 权限
import http from '../utils/http';

//获取内部所有用户
export   const GetUsers =()=>{
    return http("get","/apis/api/Permission/GetUsers")
} 

//获取用户权限数据

export const GetUserPermissionDatas=(param)=>{
    return http("get","/apis/api/Permission/GetUserPermissionDatas/?userId="+param)
}
 
//修改用户权限
export const ModifyUserPermission=(param)=>{
    return  http("put","/apis/api/Permission/ModifyUserPermission",param)
}