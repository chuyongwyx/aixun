import http from '../utils/http';
//获取所有用户
export const userAdminInfo=()=>{
     return http("get","http://is-test.aserweb.com:50102/api/User/GetUsers");
}

//根据Id获取单个用户信息
export const getUserById =(param)=>{
     return http("get","http://is-test.aserweb.com:50102/api/User/GetUserByID/?id="+param);

}
//添加内部人员
export const addUserInfo =(param)=>{
     return http("post","http://is-test.aserweb.com:50102/api/User/AddUser",param);
}
//修改内部人员
export const replaceUser =(param)=>{
     return http("put","http://is-test.aserweb.com:50102/api/User/ModifyUser",param);
}

//删除内部用户
export const deleteUser =(param)=>{
    return http('delete',"http://is-test.aserweb.com:50102/api/User/DeleteUserByID/?id="+param) 
}

//重置密码
export const ResetPassword =(param)=>{
     return http('put',"http://is-test.aserweb.com:50102/api/User/ResetPassword",param)
}