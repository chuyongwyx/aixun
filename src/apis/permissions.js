// 权限
import http from '../utils/http';

//获取内部所有用户
export   const GetUsers =()=>{
    return http("get","http://is-test.aserweb.com:50102/api/Permission/GetUsers")
} 

//获取用户权限数据

export const GetUserPermissionDatas=(param)=>{
    return http("get","http://is-test.aserweb.com:50102/api/Permission/GetUserPermissionDatas/?userId="+param)
}
 
//修改用户权限
export const ModifyUserPermission=(param)=>{
    return  http("put","http://is-test.aserweb.com:50102/api/Permission/ModifyUserPermission",param)
}